const mongoose = require('mongoose');

const TimeRangeSchema = new mongoose.Schema({
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
  });

const SlotSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: TimeRangeSchema,
        required: true
    },
    case_id: {
        type: String,
    },
    isEmpty: {
        type: Boolean,
        default: true
    }
});


const Slot = mongoose.model('Slot', SlotSchema);
module.exports = Slot;

