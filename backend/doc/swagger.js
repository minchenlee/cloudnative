import swaggerAutogen from 'swagger-autogen'

const outputFile = './swagger.json'
const endpointsFiles = ['../app.js']

swaggerAutogen(outputFile, endpointsFiles)