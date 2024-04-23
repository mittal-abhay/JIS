const Slot = require('../Models/Slot');
const moment = require('moment');

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

// API to retrieve the next 5 available slots


exports.getNextAvailableSlots = async (req, res) => {
  try {
    // Get the current time and date
    const currentTime = moment();
    const currentDate = moment().format('YYYY-MM-DD');

    // Find the next 10 available slots after the current time and date
    const nextAvailableSlots = await Slot.find({
      isEmpty: true,
      $or: [
        // Slots on the current date starting after the current time
        {
          date: currentDate,
          'time.startTime': { $gte: currentTime.format('hh:mm A') }
        },
        // Slots on future dates
        { date: { $gt: currentDate } }
      ]
    }).sort({ date: 1, 'time.startTime': 1 }).limit(15);

    if (nextAvailableSlots.length === 0) {
      return res.status(404).json({ message: 'No available slots found' });
    }

    // Manually sort the slots to ensure morning slots come before afternoon slots
    nextAvailableSlots.sort((a, b) => {
      // Compare dates first
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      } else {
        // If dates are the same, compare start times
        const timeA = moment(a.time.startTime, 'hh:mm A');
        const timeB = moment(b.time.startTime, 'hh:mm A');
        return timeA.diff(timeB);
      }
    });

    res.status(200).json(nextAvailableSlots);
  } catch (err) {
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

