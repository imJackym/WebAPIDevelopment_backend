import mongoose from 'mongoose';

const dogSchema = new mongoose.Schema(
  {
    name: { type: String },
    image: { type: String },
    breed: { type: String },
    description: { type: String },
    adoption: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const Dog = mongoose.model('dogs', dogSchema);
export default Dog;
