const paths = require('./paths')
const definations = require('./definations')
const parameters = require('./parameters')
module.exports={
    openapi: "3.0.0",
    info: {
      title: "My Auth",
      version: "1.0.0",
      description: "Demo Auth Project",
    },
    servers: [
      {
        // url: process.env.SWAGGER_BASE_URL,
        url:process.env.SWAGGER_BASE_URL,
        description: "SWAGGER_BASE_URL",
      },
    ],
   
    paths: paths,
    components:{
      schemas:definations,
      parameters:parameters
    }
  };