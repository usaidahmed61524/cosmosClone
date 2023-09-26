import mongoose from "mongoose";

const { Schema } = mongoose;

const userToAddressSchema = new mongoose.Schema({
  username: {
    type: String,

    required: true,

    unique: true,
  },

  accountAddress: {
    type: String,

    required: true,

    unique: true,
  },

  tokenId: {
    type: String,
  },

  txhash: {
    type: String,
  },

  timestamp: {
    type: String,
  },
});
export const UserToAddressData =
  mongoose.models.UserToAddress ||
  mongoose.model("UserToAddress", userToAddressSchema);
