const Slot = require('../Models/Slot');

exports.getSlotsOnDate = async (req, res) => {
  try {
    const { date } = req.params;
    // Query the database for available slots on the specified date
    const availableSlots = await Slot.find({ date, isEmpty: true });

    // Return the list of available slots in the response
    res.status(200).json(availableSlots);
  } catch (err) {
    // Handle errors
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
  }
};


exports.getSlotsBetweenDates = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;

    // Query the database for available slots within the date range
    const availableSlots = await Slot.find({
      date: { $gte: startDate, $lte: endDate },
      isEmpty: true
    });

    // Return the list of available slots in the response
    res.status(200).json(availableSlots);
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: err.message });
  }
};

exports.getSlotsbyDateTime = async (req,res) => {
  try {
    // Extract date, start time, and end time from request parameters
    const { date, startTime, endTime } = req.params;
    // Query the database for the slot matching the provided criteria
    const slot = await Slot.find({ date, 'time.startTime': startTime, 'time.endTime': endTime, isEmpty: true});

    // If slot is found, return it in the response
    if (slot) {
        res.status(200).json(slot);
    } else {
        res.status(404).json({ message: 'Slot not found' });
    }
} catch (err) {
    // Handle errors
    res.status(500).json({ error: err.message });
}
};

