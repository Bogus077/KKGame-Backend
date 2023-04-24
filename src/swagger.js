const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'api.study.kk-a.ru',
  schemes: ['https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'basic',
  }
},
  definitions: {
    User: {
        father: "Simon Doe",
        mother: "Marie Doe"
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.ts'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);