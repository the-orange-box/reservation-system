# reservation-system
implementing calendar reservation system.

The reservations components for a restaurant reservations service.
![](Lodging-Reservations-System.gif)

## Related Projects
  - https://github.com/the-orange-box/Ratings
  - https://github.com/the-orange-box/Gallery

## Table of Contents
1. [Requirements](#requirements)

## Requirements
- Node v8.15.x
- MongoDB v5.7.x
- npm v6.4.x

### Installing Dependencies
From within the root directory


1. Install project dependencies
```javascript
npm install
```

2. Create sqlConfig.js file
```javascript
copy sqlConfigExample.js and change 'PASSWORD' to your MySQL password
```

3. To create and seed the MySQL database
```javascript
npm run seed-database
```

3. To create a client bundle
```javascript
npm run react-dev
```

4. To start the server
```javascript
npm start
```

5. Go to `localhost:3000/:propertyID/` i.e. localhost:3000/2


