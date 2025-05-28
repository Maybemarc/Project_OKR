import mongoose from 'mongoose';

const keyResultSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    default: 0, 
  },
});

const okrSchema = new mongoose.Schema(
  {
    objective: {
      type: String,
      required: true,
      trim: true,
    },
    keyResults: [keyResultSchema], 
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    progress: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('OKR', okrSchema);
