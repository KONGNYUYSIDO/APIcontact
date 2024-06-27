# DESICLOUD
  DESICLOUD is a RESTful API designed to behave like an icloud. It manages contacts, to-do lists, images, notes and users. It is built with node.js, express, mongodb and includes features for creating, retrieving, searching, updating, and deleting.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**
     ```bash
     git clone https://github.com/KONGNYUYSIDO/APIcontact.git
     cd APIcontact
     
2. **Install dependencies:**
      ```bash
     npm install
      
3. **Configure environment variables:**

     Create a **.env** file and set your environment variables based on the **.env.example** file.
   
5. **Run the application:**
     ```bash
     npm run dev

## Project Structure

  -  **config/:** Contains configuration files for the application.
  -  **controllers/:** Houses controller files to handle API requests.
  -  **middleware/:** Middleware functions for request processing.
  -  **models/:** Database models for the application.
  -  **routes/:** Defines the API routes.
  -  **uploads/:** Directory for file uploads.
  -  **app.js:** Main application file that sets up the server.
  -  **api.yaml:** API documentation in YAML format.
  -  **.env.example:** Example environment variable configurations.
    
    
## Environment Variables
  Create a **.env** file in the root of your project and configure the following variables:
  
        #DATABASE_STRING
        URI = 
        
        #SERVER_PORT
        PORT = 
        
        #TOKEN
        JWT_SECRET_KEY = 
        
        #REFRESH TOKEN
        JWT_REFRESH_SECRET_KEY =

