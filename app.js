import YAML from "yamljs";
import express from "express";
import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
import swaggerJsdoc from 'swagger-jsdoc'
import { PORT, URI } from "./config/index.js";
import contactRoute from "./routes/contactRoute.js"

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CONTACT API',
            version: '1.0.0',
            description: 'An API that allows users to obtain information on all the contacts or a particular contact and also post information of a new contact',
            termsOfService: 'https://smartbear.com/terms-of-use',
            contact: {
                url: 'siddy.com',
                email: 'kongnyuyversi24@gmail.com',
            }  
        },
        servers:[
            {
                url: 'http://localhost:8080/api'
            }
        ],
        tags: {
            name: 'Contact Management',
            description: 'Endpoints to manage contacts',
            name: 'User Management',
            description: 'Endpoints to manage registered users',
            name: 'TODO List',
            description: 'Endpoints to manage the TODO List',
            name: 'Image',
            description: 'Endpoints to manage Images',
        }
    },
    apis: ['./routes/contactRoute.js']
}

const swaggerDocs = swaggerJsdoc( options );

const app = express();

//Middleware
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


//Connecting to mongodb
mongoose.connect( URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//checking if mongodb is connected successfully
const db = mongoose.connection;
db.on( 'error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () =>{
    console.log('Connected to Database successfully');
});


//using the routes
app.use('/api', contactRoute);

app.listen( PORT, () => {
    console.log('Server is running .........');
});