const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Provide a Tour Name'],
      trim: true,
      unique: [true, 'Tour name must be unique'],
      minLength: [3, 'Tour name must be at least 3 characters'],
      maxLength: [100, 'Tour name is too large'],
    },

    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },

    image: String,

    price: {
      type: Number,
      required: [true, 'Please provide price '],
      min: [0, 'Price can not be negative'],
    },

    visitor: {
      type: Number,
      required: true,
      min: [0, 'Visitor can not be negative'],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: 'Visitor must be an integer',
    },

    viewCount: {
      type: Number,
      default: 0,
      required: true,
    },

    status: {
      type: String,
      required: true,
      default: 'book-now',
      enum: {
        values: ['book-now', 'wish-list'],
        message: `status value can't be ${VALUE}, must be book-now/wish-list`,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Model
const Tours = mongoose.model('Tours', toursSchema);

module.exports = Tours;
