import mongoose from "mongoose";

const UserTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    token: {
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

const UserToken = mongoose.model("UserToken", UserTokenSchema);

export default UserToken;
