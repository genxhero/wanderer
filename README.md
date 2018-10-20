# wayfarer

An application 

# Background and Overview

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
Given a number of desired driving hours and a final destination, Wayfarer will extrapolate an approximate distance from the user's location and find a cluster of lodging within a reasonable radius of the furthest possible highway offramp along their route.

# Technologies and Technical Challenges

## Google API

The Google maps api can provide us with a matrix of global coordinates which we will use to draw a visualization of 

# Things Accomplished Over the Weekend

* Completed this proposal
* 

# Group Members and Work Breakdown



## Dependencies
*  express 
*  mongoose
*  passport
*  passport-jwt
*  jsonwebtoken
*  body-parser
*  bcryptjs
*  validator
*  nodemon