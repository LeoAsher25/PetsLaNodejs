import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    expireAt: {
      type: String,
      default: Date.now() + Number(process.env.REFRESH_TOKEN_LIFE),
    },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model("Session", SessionSchema);

export default Session;
