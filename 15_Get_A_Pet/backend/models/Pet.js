const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Pet = mongoose.model(
  "Pet",
  new Schema(
    {
      name: { type: String, required: true },
      age: { type: Number, required: true },
      weight: { type: Number, required: true },
      color: { type: String, required: true },
      images: { type: Array, required: true },
      available: { type: Boolean, required: true },
      user: Object,
      adopter: Object,
    },

    { timestamps: true } //para o createdAt e updateAt
  )
);

module.exports = Pet;
