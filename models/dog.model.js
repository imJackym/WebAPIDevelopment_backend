const mongoose = require('mongoose')

const dogSchema = new mongoose.Schema(
  {
    name: { type: String },
    image: { type: String, default: "loading.jpg" },
    breed: { type: String },
    description: { type: String },
    adoption: { type: Boolean, required: true, default: false },
    icode: { type: String },
  },
  {
    timestamps: true,
  }
);

const Dog = mongoose.model('dogs', dogSchema);
module.exports = Dog;
