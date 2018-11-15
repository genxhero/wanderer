const mongoose = require("mongoose");
const schema = mongoose.Schema;

//Vehicle model

const VehicleSchema = new schema ({
    name: {
      type: String,
      required: true
    },
    make: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    hwyMpg: {
      type: Number,
      required:true
    },
    cityMpg: {
      type: Number,
      required: true
    },
    tankSize: {
      type: Number,
      required: true
    },
    maxRouteLength: {
      type: Number
    },
    owner:  {
      type: schema.Types.ObjectId,
      ref: 'User' }
});

const Vehicle = mongoose.model("vehicle", VehicleSchema);

module.exports = {
    VehicleSchema: VehicleSchema,
    Vehicle: Vehicle
};




