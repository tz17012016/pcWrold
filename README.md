# pcWrold eCommerce Platform

 This is the finale project for my web bootcamp,
 an eCommerce platform built with the MERN stack & Redux.
 
# Demo server
 heare you can visit the server of pcWrold in heroku => https://pcwrold.herokuapp.com/
 
# Demo site
 heare you can visit the "pcWrold" in netlify => https://pcwrold.netlify.app/

# Features
* Full featured shopping cart
* Product reviews and ratings
* Top products carousel
* Product pagination
* Product search feature
* User profile with orders
* Admin product management
* Admin user management
* Admin Order details page
* User Admin and Protected Routes
* Mark orders as delivered option
* Checkout process (shipping, payment method, etc)
* PayPal / credit card integration
* Database seeder (products & users)
* Categories CRUD
* Sub Categories CRUD
* Coupon CRUD
* Wishlist CRUD
* Products based on Categories and Sub Categories
* Creating Products with Categories and Sub Categories
* Advance Searching and Filtering


## Usage

### ES Modules in Node

I use ECMAScript Modules in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error.

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'your jwt secret'
PAYPAL_CLIENT_ID = your paypal client id

```
## Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server

```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build

```
There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku.

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data


```

# Import data
npm run data:import

# Destroy data
npm run data:destroy

```

### Sample User Logins


```

admin@example.com (Admin)
123456

john@example.com (User)
123456

jane@example.com (User)
123456

```






