const CourtCase = require('../Models/CourtCase');
const Slot = require('../Models/Slot');



exports.createCourtCase = async (req, res) => {
  try {
    // Destructure required fields from req.body
    const { CIN, defendant, crime, arrest, timeline, judge, prosecutor, lawyer, start_date} = req.body;
    
    // Check if any of the required fields are missing
    const missingFields = [];
    if (!CIN) missingFields.push('CIN');
    if (!defendant || !defendant.name || !defendant.address) missingFields.push('defendant');
    if (!crime || !crime.type || !crime.date_committed || !crime.location) missingFields.push('crime');
    if (!arrest || !arrest.arresting_officer || !arrest.date) missingFields.push('arrest');
    if (!timeline || timeline.length === 0) missingFields.push('timeline');
    if (!judge) missingFields.push('judge');
    if (!prosecutor) missingFields.push('prosecutor');
    if (!lawyer) missingFields.push('lawyer');
    if (!start_date) missingFields.push('start_date');

    if(CIN.length > 3 || CIN.length < 3){
      return res.status(400).json({ message: 'Invalid CIN length' });
    }
    const existingCIN = await CourtCase.findOne({ CIN: CIN });
    if (existingCIN) {
      return res.status(400).json({ message: 'CIN already exists' });
    }
    // If any required fields are missing, return an error message
    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Missing required field(s): ${missingFields.join(', ')}` });
    }
    
    // Check if the timeline has all required fields
    const missingTimelineFields = timeline.reduce((acc, curr, index) => {
      if (!curr.date || !curr.startTime || !curr.endTime) acc.push(`timeline[${index}]`);
      return acc;
    }, []);

    if (missingTimelineFields.length > 0) {
      return res.status(400).json({ error: `Missing required field(s) in timeline: ${missingTimelineFields.join(', ')}` });
    }

    // Proceed with creating the court case
    const ondate = timeline[0].date;
    const start = timeline[0].startTime;
    const end = timeline[0].endTime;

    const slot = await Slot.findOne({ date: ondate, 'time.startTime': start, 'time.endTime': end, isEmpty: true });
    if (slot) {
      const courtCase = await CourtCase.create(req.body);
      slot.case_id = courtCase._id;
      slot.isEmpty = false;
      await slot.save();
      return res.status(201).json({ courtCase });
    }

    // If no empty slot is found, return an error message
    return res.status(400).json({ error: 'No available slots found' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// API to retrieve all court cases
exports.getAllCourtCases = async (req, res) => {
  try {
    const courtCases = await CourtCase.find();
    res.status(200).json(courtCases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// API to retrieve a single court case by ID
exports.getCourtCaseById = async (req, res) => {
  try {
    const courtCase = await CourtCase.findById(req.params.id);
    if (!courtCase) {
      return res.status(404).json({ message: 'Court case not found' });
    }
    res.status(200).json(courtCase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getCaseByCIN = async (req, res) => {
  try {
    const { cin } = req.params;
    
    const caseDetails = await CourtCase.findOne({ CIN: cin });

    if (!caseDetails) {
      return res.status(404).json({ message: 'Case not found' });
    }

    res.status(200).json(caseDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// API to update a court case by ID
exports.updateCourtCase = async (req, res) => {
  try {
    const courtCase = await CourtCase.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!courtCase) {
      return res.status(404).json({ message: 'Court case not found' });
    }
    res.status(200).json(courtCase);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// API to delete a court case by ID
exports.deleteCourtCase = async (req, res) => {
  try {
    const courtCase = await CourtCase.findByIdAndDelete(req.params.id);
    if (!courtCase) {
      return res.status(404).json({ message: 'Court case not found' });
    }
    res.status(200).json({ message: 'Court case deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// API to retrieve all pending court cases sorted by CIN
exports.getPendingCases = async (req, res) => {
  try {
    const pendingCases = await CourtCase.find({ status: "pending" });
    res.status(200).json(pendingCases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// API to retrieve all resolved court cases over a given period, chronologically
exports.getResolvedCourtCases = async (req, res) => {
  try {
      const { startDate, endDate } = req.params;

      // Check if start date is greater than end date
      if (new Date(startDate) > new Date(endDate)) {
          return res.status(400).json({ error: 'Start date cannot be greater than end date' });
      }

      const resolvedCourtCases = await CourtCase.find({
          status: 'resolved',
          'judgment.date': { $gte: startDate, $lte: endDate }
      }).sort({ 'judgment.date': 1 });

      res.status(200).json(resolvedCourtCases);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};


// API to retrieve court cases scheduled for hearing on a particular date
exports.getCourtCasesForHearingDate = async (req, res) => {
    try {
      const { date } = req.params;
      const courtCasesForHearingDate = await CourtCase.find({ 'timeline.date': date });
      if(courtCasesForHearingDate.length === 0) {
        return res.status(404).json({ message: 'No court cases scheduled for this date' });
      }
      res.status(200).json(courtCasesForHearingDate);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

  

// API to retrieve the status of a specific court case identified by CIN
exports.getCaseStatus = async (req, res) => {
    try {
      const { CIN } = req.params;
      const courtCase = await CourtCase.findOne({ CIN: CIN });
      if (!courtCase) {
        return res.status(404).json({ message: 'Court case not found' });
      }
      res.status(200).json({ status: courtCase.status });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


// API to search for past court cases by keywords
exports.searchCourtCases = async (req, res) => {
    try {
      const { keywords } = req.query;
  
      // Perform search by keywords
      const courtCases = await CourtCase.find({
        $or: [
          { 'defendant.name': { $regex: keywords, $options: 'i' } },
          { 'crime.type': { $regex: keywords, $options: 'i' } },
          { 'crime.location': { $regex: keywords, $options: 'i' } },
          { 'arrest.arresting_officer': { $regex: keywords, $options: 'i' } },
          { 'judge': { $regex: keywords, $options: 'i' } },
          { 'prosecutor': { $regex: keywords, $options: 'i' } },
          { 'lawyer': { $regex: keywords, $options: 'i' } },
        ]
      });
  
      res.status(200).json(courtCases);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  


exports.recordAdjournment = async (req, res) => {
    try {
        const { newHearingDate, summary, startTime, endTime } = req.body;
        const { cin } = req.params;
        const courtCase = await CourtCase.findOne({CIN: cin});
        if (!courtCase) {
          return res.status(404).json({ message: 'Court case not found' });
        }
        const lastDate = courtCase.timeline[courtCase.timeline.length - 1].date;
        
        if (new Date(newHearingDate) <= new Date(lastDate)) {
          return res.status(400).json({ message: 'New hearing date must be after the last hearing date'});
        }

        if(courtCase.status === 'resolved'){  
          return res.status(400).json({ message: 'The case is already closed'});
        }
        const slot = await Slot.findOne({ date: newHearingDate, 'time.startTime': startTime, 'time.endTime': endTime, isEmpty: true});
        if (slot) {
          slot.case_id = courtCase._id;
          slot.isEmpty = false;
          await slot.save();
        }else{
          return res.status(400).json({ message: 'No available slots found' });
        }
        if(!summary){
          return res.status(400).json({message: "Summary missing"});
        }
        
        const updatedCourtCase = await CourtCase.findOneAndUpdate(
            { CIN: cin},
            { 
              $push: {
                'adjournments': { date: lastDate, newHearingDate: newHearingDate, summary: summary,startTime: startTime, endTime: endTime},
                'timeline': {date: newHearingDate, startTime: startTime, endTime: endTime}
            }
            },
            { new: true }
        );
       
        

        if (!updatedCourtCase) {
            return res.status(404).json({ message: 'Court case not found' });
        }

        res.status(200).json({ message: "Adjournment recorded successfully", updatedCourtCase });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
};


// Record Court Proceedings API
exports.recordProceedings = async (req, res) => {
  try {
    const { newHearingDate, summary, startTime, endTime } = req.body;
    const { cin } = req.params;
    const courtCase = await CourtCase.findOne({CIN: cin});
    if (!courtCase) {
      return res.status(404).json({ message: 'Court case not found' });
    }
    const lastDate = courtCase.timeline[courtCase.timeline.length - 1].date;
    
    if (new Date(newHearingDate) <= new Date(lastDate)) {
      return res.status(400).json({ message: 'New hearing date must be after the last hearing date'});
    }

    if(courtCase.status === 'resolved'){  
      return res.status(400).json({ message: 'The case is already closed'});
    }
    const slot = await Slot.findOne({ date: newHearingDate, 'time.startTime': startTime, 'time.endTime': endTime, isEmpty: true});
    if (slot) {
      slot.case_id = courtCase._id;
      slot.isEmpty = false;
      await slot.save();
    }else{
          return res.status(400).json({ message: 'No available slots found' });
    }
    if(!summary){
      return res.status(400).json({message: "Summary missing"});
    }


    const updatedCourtCase = await CourtCase.findOneAndUpdate(
        { CIN: cin },
        { 
          $push: {
            'hearings': { date: lastDate, newHearingDate: newHearingDate, summary: summary,startTime: startTime, endTime: endTime},
            'timeline': {date: newHearingDate, startTime: startTime, endTime: endTime}
        }
        },
        { new: true }
    );
    
    if (!updatedCourtCase) {
        return res.status(404).json({ message: 'Court case not found' });
    }
    res.status(200).json({ message: "Hearings recorded successfully", updatedCourtCase });
} catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
}
};

exports.recordJudgment = async (req, res) => {
    try {
        const { summary } = req.body;
        const { cin } = req.params;
        
        const courtCase = await CourtCase.findOne({CIN: cin});
        if (!courtCase) {
          return res.status(404).json({ message: 'Court case not found' });
        }
        const lastDate = courtCase.timeline[courtCase.timeline.length - 1].date;
        if(courtCase.status === 'resolved'){  
          return res.status(400).json({ message: 'The case is already closed'});
        }
        if(!summary){
          return res.status(400).json({message: "Summary missing"});
        }
        const updatedCourtCase = await CourtCase.findOneAndUpdate(
            { CIN: cin },
            { $set: { judgment: { date: lastDate, summary: summary }, status: 'resolved' }},
            { new: true }
        );
        if (!updatedCourtCase) {
            return res.status(404).json({ message: 'Court case not found' });
        }
        res.status(200).json({ message: "Judgment recorded successfully", updatedCourtCase });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


