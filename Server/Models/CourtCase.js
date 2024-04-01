// courtCase.js
const mongoose = require('mongoose');

const HearingSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  newHearingDate: {
    type: String,
  },
  summary: {
    type: String
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  }
  });

const AdjournmentSchema = new mongoose.Schema({
  date: {
    type: String
  },
  newHearingDate: {
    type: String,
  },
  summary: {
    type: String
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  }
});

const TimelineSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  startTime: {    
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  }
});

const CourtCaseSchema = new mongoose.Schema({
  CIN: {
    type: String,
    required: true,
    unique: true,
    maxlength: 3
  },
  defendant: {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  crime: {
    type: {
      type: String,
      required: true
    },
    date_committed: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  },
  arrest: {
    arresting_officer: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },
  hearings: [HearingSchema],
  timeline: [TimelineSchema],
  judge: {
    type: String,
    required: true
  },
  prosecutor: {
    type: String,
    required: true
  },
  lawyer: {
    type: String,
    required: true
  },
  start_date: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  
  adjournments: [AdjournmentSchema],
  judgment: {
    date: {
      type: String
    },
    summary: {
      type: String
    }
  }
});

const CourtCase = mongoose.model('CourtCase', CourtCaseSchema);

module.exports = CourtCase;
