import mongoose, { Schema, models, model } from "mongoose";

const visitsCounterSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true,
        default: 0,
    }
});


const AnalyticsSchema = new Schema({
  sessionId: { type: String, index: true }, // group visits
  ip: { type: String }, // hash this ideally
  userAgent: String,

  device: {
    type: { type: String }, // mobile / desktop
    os: String,
    browser: String,
  },

  location: {
    country: String,
    city: String,
  },

  page: String,

  referrer: String, // where user came from

  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

const ChangeMessages = models.ChangeMessages || mongoose.model("ChangeMessages", new mongoose.Schema({
    message: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
}));

const VisitsCounter = models.VisitsCounter || mongoose.model("VisitsCounter", visitsCounterSchema);
const Analytics = models.Analytics || mongoose.model("Analytics", AnalyticsSchema);
const Notes = models.Notes || mongoose.model("Notes", new mongoose.Schema({
    content: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
}));

const NotePassword = models.NotePassword || mongoose.model("NotePassword", new mongoose.Schema({
    hash: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
}));

export { VisitsCounter, Analytics, ChangeMessages, Notes, NotePassword };
