
## Wayfarer

Wayfarer is an app designed to facilitate adventure across the open roads of America.

# Background and Overview
 
Some days you  just want to hit the road in a random direction and explore the world around you. But perhaps you still have some lingering conundrums gnawing at the back of your mind, questions that a simple Google maps search can't answer?

* "I'll start falling asleep behind the wheel if I drive past 10, so I must find a hotel.  But I don't know what town I'll be in if I drive for eight hours!"
*  "I've only got half a tank of gas and I want to go now. What's the last place I could safely fill up at?"


Wayfarer seeks to answer these questions through eye-catching visual imagery and a well-organized presentation of data.



# Functionality and MVP

## User Auth

When a new user creates an account, they will be asked to fill out the following fields which will be saved to our database:

*  Username: The user's desired screen name; validated for uniqueness and presence.
*  Password:  The user's desired password.  Users will not be permitted to enter certain overly used passwords such as "password", "abc123", "swordfish", et cetera.
*  Email: User's current email address, to be used for password recovery and notifications

In addition, the sign up page will require information about the user's primary automobile:

*  Name: A reference name under which the vehicle will be restored; by default this name is "Primary".
*  City MPG: The vehicle's primaryapproximate miles per gallon when driving on city streets.
*  Highway MPG: The vehicle's approximate miles per gallon when driving on the open road.
*  Tank Size: The size in American gallons of the vehicle's gasoline tank.

A user can actually use the app to plan their next adventure, but their vehicle information will not be saved.

## Go the Distance
Given a percentage of a full tank of gasoline, information about the user's vehicle, and data from the Google maps API, Wayfarer will find the farthest gasoline station (or group of stations) that can be reached without filling up in every direction and then visualize a spread starting at the user's current location.


## Lay Your Weary Head to Rest
Given a number of desired driving hours and a final destination, Wayfarer will extrapolate an approximate distance from the user's location and find a cluster of lodging within a reasonable radius of the furthest possible highway offramp along their route.  The pathway between each checkpoint will be be displayed in a different randomly selected color.

## Bonus Feature 1:  Vista Points

Our database will hold a table of vista points with lat/long coordinates.

The user will be able to see these vista points along their trip route.

If the vista point is off the beaten path somewhere, a separate visualization of how far they can reasonably drive given their mpg will be displayed in a different color over the current spread.

# Technologies and Technical Challenges



## Backend: Google API, Mongo, Express, Node 

The Google maps api will provide us with global coordinate data  that our frontend will use 



## Frontend: React

Our user interface will consist of  the following components:

*  A main display window where we will output our visualization. It will be framed by the other components.

*  Top: A multi-pane form component where a user can use one of features of the app.  When information is entered in the active pane, the visualization will update  

*  Right: Detailed information about hotels, gas stations, points of interest in a selected checkpoint.

*  Left:  A selectable list of end checkpoints (gas station, exit with lodging, et cetera).

* Bottom: Approximate distance drivable, disclaimer


## Dependencies

This project uses the following Node packages:
*  express 
*  mongoose
*  passport
*  passport-jwt
*  jsonwebtoken
*  body-parser
*  bcryptjs
*  validator
*  nodemon

## Challenges

The first and most basic challenge lies in finding out how we can use our frontend code to map the data we receive from the API into a format that the user will find visually appealing and easy to understand.

# Things Accomplished Over the Weekend

* Completed this proposal


# Group Members and Work Breakdown

### Aaron Russell Goddard

* Monday:
* Tuesday: 
* Wednesday:
* Thursday:
* Friday: 
* Saturday:
* Sunday: 

### La Luo

* Monday:
* Tuesday: 
* Wednesday:
* Thursday:
* Friday: 
* Saturday:
* Sunday: 
### Cassandra McClure

* Monday:
* Tuesday: 
* Wednesday:
* Thursday:
* Friday: 
* Saturday:
* Sunday: 
