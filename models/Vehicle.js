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
        type: integer,
        required: true
    },
    hwyMpg: {
         type: integer
    },
    cityMpg: {
        type: integer
    },
    tankSize: {
        type: integer 
    },
    maxRouteLength: {
        type: integer
    }
})

module.exports = User = mongoose.model('vehicle', VehicleSchema)