# DESICLOUD
  DESICLOUD is a RESTful API designed to behave like an icloud. It manages contacts, to-do lists, images, notes and users. It is built with node.js, express, mongodb and includes features for creating, retrieving, searching, updating, and deleting.

## Table of Contents

- [Getting Started](#getting-started)
    - [Requirements](#requirements)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
- [Project API Endpoints](#project-api-endpoints)
- [Environment Variables](#environment-variables)
- [Issues](#issues)
- [Contributing](#contributing)
- [License](#license)

## Getting Started
  Follow the instructions below to set up the project on your machine locally for development and testing purposes

### Requirements
  -  **Node.js** installed
  -  **NPM (Node Package Manager)** installed

### Installing

1. **Clone the repository:**
     ```bash
     git clone https://github.com/KONGNYUYSIDO/APIcontact.git

2. **Navigate to the project's directory:**
     ```bash
     cd APIcontact
     
3. **Install dependencies:**
      ```bash
     npm install
   
### Running the application
  -  **Development Mode with Nodemon:**
     ```bash
     npm run dev

## Project API Endpoints
  ### Contact Endpoints
  -  **(GET) /api/contacts:** Retrieves the list of all contacts
  -  **(POST) /api/contacts/create:** Creates or adds a new contact
  -  **(GET) /api/contacts/search:** Searches for a particular contact
  -  **(PUT) /api/contacts/update/{id}:** Updates a contact
  -  **(DELETE) /api/contacts/delete/{id}:** Deletes a contact
  ### User Endpoints
  -  **(POST) /api/users/register:** Registering a new user
  -  **(POST) /api/users/login:** Signs in a user and obtains a token

  ### TODO_List Endpoints
  -  **(GET) /api/user/todo_list:** Retrieves the list of todos
  -  **(POST) /api/user/new/todo_list:** Create/add a new todo 
  -  **(PUT) /api/user/update/todo_list/{id}:** Updates existing todo
  -  **(GET) /api/user/todo_list/completed:** Retrieves list of completed todos
  -  **(DELETE) /api/user/delete/todo_list/{id}:** Deletes todo 
  -  **(GET) /api/user/todo_list/uncompleted:** Retrieves list of uncompleted todos

  ### Image Endpoints
  -  **(GET) /api/user/AllImages:** Retrieves all images
  -  **(POST) /api/user/add_image:** Adds a new image

  ### Notebook Endpoints
  -  **(GET) /api/user/getAll/notes/notebook:** Retrieves list of notes
  -  **(POST) /api/user/create/note/notebook:** Add/create a new note
  -  **(PUT) /api/user/modify/note/{id}:** Updates a note
  -  **(GET) /api/user/search/note/category/notebook/{category}:** Retrieves all notes under a category
  -  **(DELETE) /api/user/delete/note/notebook/{id}:** Deletes a note
    
    
## Environment Variables
  Create a **.env** file and set your environment variables based on the **.env.example** file.

## Issues
  If you encounter any issues or have suggestions, please open an [issue](#issue)

