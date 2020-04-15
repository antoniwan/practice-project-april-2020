import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: { type: moongose.Schema.Types.ObjectId, ref: "User" },
});

const Message = moongose.model("Message", messageSchema);

export default Message;
