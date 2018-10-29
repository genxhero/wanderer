# README

### [Live](http://boiling-sierra-91034.herokuapp.com/)

## Description
<Insert Text Here>

## Technologies Used
- MongoDB with Mongoose
- Express
- React.js
- Redux
- Node.js
- axios


## Key Features

### Using Wayfarer as a guest vs. logging in
While Wayfarer encourages you to jump right in by adding a vehicle and planning your trip, we also allow you to register in order to save the data for the cars you use most! The vehicle index saves your car data to our database so you can select the vehicle you intend to use for your road trip.

![alt-text](https://github.com/genxhero/wayfarer/readme-assets/DemoVehicleIndex.PNG "Logged In User Vehicle Index")

In order to provide a seamless experience, the login page redirects to the vehicles page after login.  After selecting a vehicle, you are linked to the core Wayfarer widget which calculates the distance to the furthest gas station you can reach, as well as the hotels and restaurants along the way based on how long you want to drive.  To prevent issues where the Wayfarer widget lacks the information needed to make these calculations, the route is protected - if there is no vehicle in state, then you will be redirected either to the add vehicle form or the vehicles index, depending on whether you are a guest or an authorized user.

```const ProtectedDistance = ({ component: Component, path, isVehicle, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
      isVehicle ? (
        <Component {...props} />
      ) : (
      loggedIn ? (
        <Redirect to="/vehicles" />
      ) : (
        <Redirect to="/addvehicle" />
      )
      )
  )} />
);
```

Additionally, making sure that the state was properly passed was a bit more challenging than expected.  When going to the Wayfarer widget from the vehicle index, the vehicles slice of state contains an array of all vehicles associated with a user - clearly a suboptimal state to be passed to the widget when the information for exactly one car is required.  Fortunately, with Redux, it's fairly easy to control state - instead of merging state like in most cases, having the vehicles reducer just return the state and rely on API calls for fetching one or all of a user's vehicles worked perfectly in combination with the correct React lifecycle methods.


The Vehicles Reducer

```
export default (state= {}, action) =>{
  Object.freeze(state);
  switch(action.type) {
      case RECEIVE_VEHICLE:
        return action.payload
      case RECEIVE_VEHICLES:
        return action.payload
      default:
        return state;
  }
};
```

The life cycle call to fetch all the vehicles and the conditional to protect against edge cases

```componentDidMount () {
    this.props.fetchUserVehicles();
  }

  render() {
  let vehicles = "";
  if (this.props.vehicles) {
    vehicles = Object.values(this.props.vehicles).map(vehicle => <VehicleIndexItem
      key={vehicle._id}
      vehicle={vehicle}
      fetchVehicle={this.props.fetchVehicle}
      receiveVehicle={this.props.receiveVehicle}/>
      );
  } else {
    vehicles = "No vehicles found"
  }
```

The vehicle item call and API call to change the vehicles slice of state

```
  handleClick(e) {
    this.props.fetchVehicle(this.props.vehicle._id);
  }
  ...
  export const fetchVehicle = (vehicleId) => dispatch => (
  axios
  .get(`/api/vehicles/${vehicleId}`)
  .then(res => dispatch(receiveVehicle(res.data)))
  .catch(err => dispatch({type: GET_VEHICLE_ERRORS, payload: err.response.data}))
)
```

Overall, Wayfarer relies a lot on pieces of state being the right things at the right time, sometimes even within the same component.

Lola Part:

Map:

Intro:
After the user inputs the gas percentage of his/her tank,  our map would give the prediction of about what location his/her car would run out of gas, which alerts users to refuel before that location. It would also find out the nearby gas stations around that place, so if there is no gas station the user could be informed to refuel ahead of time. It can let users input planned driving time before his/her meal and sleep as well, thus our users can book restaurant or a hotel to avoid waiting or rooms sold out.

Technologies:
Google Maps API
HTML5 Geolocation API
eploy.js: Google Maps API Extension
map-icons.js: Custom Marker

Core Features:
1. Calculate locaton
    First use google maps route -steps
    Second use polyline for single long step
2. Creating custom markers

![alt-text](https://github.com/genxhero/wayfarer/readme-assets/MapDemo.PNG "Wayfarer map with icons")

## Vehicle Information


### Technology

In order to store vehicle data from user input, Wayfarer employs MongoDB and express routing.

## Challenges and Solutions

So that a user could choose to use our app without registering  I found that the best solution was to create two separate backend routes: one that checked jwt for a current user, and one that did not.  Then we would employ logic on the frontend to determine which route would get called on from our new vehicle frontend component.

The route``api/vehicles/addoffline`` was relatively simple, as it only needed to create a new vehicle and pass a json object to the frontend.  

In order for a logged in user to be associated with their cars properly, we needed to get past our first hurdle: that associations within a mongo database aren't nearly as intuitive as they are in relational databases.  

Many hours of intensive research and experimenting gave birth to the following solution:

*  Export both a model and a schema from the Vehicle model file.

```javascript
const Vehicle = mongoose.model("vehicle", VehicleSchema);
module.exports = {
    VehicleSchema: VehicleSchema,
    Vehicle: Vehicle
};
```

*  Import and the model into the routes file, where we used it to create our vehicle database entries
```javascript
const Vehicle = require("../../models/Vehicle").Vehicle;
...
 const newVehicle = new Vehicle({
        name: req.body.name,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        hwyMpg: req.body.hwyMpg,
        cityMpg: req.body.cityMpg,
        tankSize: req.body.tankSize
      });
      newVehicle.maxRouteLength =
        ((newVehicle.hwyMpg + newVehicle.cityMpg) / 2) 
        * newVehicle.tankSize;
```
*  Import the schema into the User model file
```javascript
const VehicleSchema = require('./Vehicle').VehicleSchema;
```
*  Nest the schema inside the User schema by wrapping it in square brackets.
```javascript
 },
  vehicles: [VehicleSchema]
});
```
*  Find the current user in the database, and push the newly minted vehicle onto the user's vehicles array, then save the user.
```javascript
        owner.vehicles.push(newVehicle);
        owner.save();
```

*  Finally, we save our vehicle and send a json object to our frontend.

```javascript
  newVehicle
   .save()
   .then(vehicle => res.json(vehicle));
```


The very next challenge that we faced was that the user's vehicles array was never saving and the code was going straight to the `newVehicle.save()` at the end of the ``/addonline`` route function. To fix this, we used the async/await in order to allow ``the User.save()`` function to complete prior to the execution of the remaining code:

```javascript
router.post(
  "/addonline", 
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    . . .
```
After cleaning everything up, this is what we came up with:
```javascript
    owner.vehicles.push(newVehicle);
    owner = await owner.save();
      newVehicle
      .save()
      .then(vehicle => res.json(vehicle));
```

In overcoming this challenge we learned:
   *  That Mongo Database models gain an id immediately upon instantiation.  During debugging we were able to determine that, indeed, each instance of Vehicle had a unique id that we could see in the console.
   *  That Javascript's ``async/await`` pattern can be very useful when one wants to save two database models in the same function.