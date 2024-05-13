import express from "express";
// import Contact from "../models/contactModel.js";
import { getAllContacts } from "../controllers/contactController.js";
import { addContact } from "../controllers/contactController.js";
import { searchContact } from "../controllers/contactController.js";
import { updateContact } from "../controllers/contactController.js";
import { deleteContact } from "../controllers/contactController.js";

import { forgotPassword, Register, resetpassword } from "../controllers/userController.js";
import { Login } from "../controllers/userController.js";

import checkToken from "../middlewares/auth.js";
import { completedTodo, createTodo, deleteTodo, getTodos, uncompletedTodo, updateTodo } from "../controllers/todoController.js";

import { getAllImages, postImage } from "../controllers/imageController.js";

import upload from "../middlewares/upload.js";
import { createNote, deleteNote, getAllNotes, searchNote, updateNote } from "../controllers/notesController.js";



const router = express.Router();

//route to get all the contacts

/**
 * @swagger
 *  components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              in: header
 *      schemas:
 *          User:
 *              properties:
 *                  userName:
 *                      type: string
 *                  userEmail:
 *                      type: string
 *                      example: user@gmail.com
 *                  password:
 *                      type: string
 *          Notebook:
 *              properties:
 *                  title:
 *                      type: string
 *                  content:
 *                      type: string
 *                  category:
 *                      type: string
 *          Image:
 *              properties:
 *                  fileName:
 *                      type: string
 *                  filePath:
 *                      type: string
 *          Todo:
 *              properties:
 *                  task:
 *                      type: string
 *                  Status:
 *                      type: string
 *                      enum: [ 'pending', 'in_progress', 'completed' ]
 *                      default: 'pending'
 *                  dueDate:
 *                      type: string
 *                      format: date
 *                  createdAt:
 *                      type: string
 *                      format: date
 *          Contact:
 *              properties:
 *                  firstName:
 *                      type: string
 *                      example: John
 *                  surName:
 *                      type: string
 *                      example: Doe
 *                  emailAddress:
 *                      type: string
 *                      example: doe23@gmail.com
 *                      format: email
 *                  phoneNumber1:
 *                      type: string
 *                      example: +237651833988
 *                  phoneNumber2: 
 *                      type: string
 *                      example: +237682431802
 *                  address:
 *                      type: string
 *                      example: 123 Main St, CityVille, State, 12345, USA
 *                  company:
 *                      type: string
 *                  birthday:
 *                      type: string
 *                      format: date
 *                  jobTitle:
 *                      type: string
 *                  relationship:
 *                      type: string
 *                      enum: ['colleague', 'friend', 'family', 'other' ]
 */

/**
 * @swagger
 * /contacts:
 *      get:
 *          summary: List of all contacts
 *          description: This endpoint returns the list of information of all contacts
 *          tags:
 *             - Contact Management
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: Successfull get request
 */
router.get( '/contacts', checkToken, getAllContacts );


// route to create a new contact
/**
 * 
 * @swagger
 * /contacts/create:
 *      post:
 *          summary: Creating a new contact
 *          description: This endpoint creates a new contact into the database
 *          tags:
 *              - Contact Management
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Contact'
 *          responses:
 *              200:
 *                  description: Created successfully
 *              400:
 *                  description: Bad request
 */
router.post( '/contacts/create', checkToken, addContact );


// route to get a specific contact
/**
 * @swagger
 * /contacts/search:
 *      get:
 *          summary: List of all contacts that matches the searchterm
 *          description: This endpoint permits the user to search for a contact either by firstname or surname or email
 *          tags:
 *             - Contact Management
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: query
 *                name: searchTerm
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *              200:
 *                  description: Successfull get request
 *              401:
 *                  description: No Contact(s) with the search term exist
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *              500:
 *                  description: Internal Server Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 */
router.get( '/contacts/search', checkToken, searchContact );



//route to update a contact 

/**
 * 
 * @swagger
 * /contacts/update/{id}:
 *      put:
 *          summary: Updating an existing contact
 *          description: This endpoint permits the user to update a contact's information
 *          tags:
 *              - Contact Management
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                format: objectId
 *                schema:
 *                      type: string
 *          requestBody:
 *              required: true
 *              content:
 *                application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Contact'
 *          responses:
 *              200:
 *                  description: Updated successfully
 *              400:
 *                  description: Bad request
 */
router.put( '/contacts/update/:id', checkToken, updateContact );



//route to delete a contact 

/**
 * 
 * @swagger
 * /contacts/delete/{id}:
 *      delete:
 *          summary: Deleting an existing contact
 *          description: This endpoint permits the user to delete a contact's information
 *          tags:
 *              - Contact Management
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                format: ObjectId
 *                schema:
 *                      type: string
 *          responses:
 *              200:
 *                  description: Deleted successfully
 *              400:
 *                  description: Bad request
 */
router.delete( '/contacts/delete/:id', checkToken, deleteContact );


/**
 * 
 * @swagger
 * /users/register:
 *      post:
 *          summary: Registering a new user
 *          description: This endpoint permits the user to get registered into the database
 *          tags:
 *              - User Management
 *          requestBody:
 *              required: true
 *              content:
 *                application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              200:
 *                  description: User registered successfully
 *              400:
 *                  description: Bad request
 */
router.post('/users/register',  Register );


/**
 * 
 * @swagger
 * /users/login:
 *      post:
 *          summary: Logging in a user
 *          description: This endpoint permits the user to log in
 *          tags:
 *              - User Management
 *          requestBody:
 *              required: true
 *              content:
 *                application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              userName:
 *                                  type: string
 *                              password:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: User registered successfully
 *              400:
 *                  description: Bad request
 */
router.post('/users/login', Login );




/**
 * 
 * @swagger
 * /user/login/forgot_password:
 *      post:
 *          summary: Initiate Resetting password
 *          description: Sending a reset password link to the user's email
 *          tags:
 *              - User Management
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              userEmail:
 *                                  type: string
 *                                  example: user@gmail.com
 *                                  description": User's email
 *          responses:
 *              200:
 *                  description: email sent
 */
router.post('/user/login/forgot_password', forgotPassword);



/**
 * 
 * @swagger
 * /user/reset_password/{token}:
 *      post:
 *          summary: Resetting user's password
 *          description: Resetting user's password with the help of a valid token
 *          tags:
 *              - User Management
 *          parameters:
 *              - in: path
 *                name: token
 *                required: true
 *                schema:
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              password:
 *                                  type: string
 *                                  description: New password
 *          responses:
 *              200:
 *                  description: password changed
 *              400:
 *                  description: Bad request
 */
router.post('/user/reset_password/:token', resetpassword );



/**
 * 
 * @swagger
 * /user/todo_list:
 *      get:
 *          summary: Getting all the tasks in the list
 *          description: User can retrieve all the different tasks in the todo list
 *          tags:
 *              - TODO List
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200: 
 *                  description: Successful request
 *              400:
 *                  description: Failed/Bad request
 *              500:
 *                  description: Internal Server Error
 */
router.get('/user/todo_list', checkToken, getTodos );



/** 
 * 
 * @swagger
 * /user/new/todo_list:
 *      post:
 *          summary: Adding a new Task
 *          description: The user can add new task(s)
 *          tags:
 *              - TODO List
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Todo'
 *          responses:
 *              200:
 *                  description: successful
 *              400: 
 *                  description: Bad request
 *              500: 
 *                  description: Internal Server Error
*/
router.post('/user/new/todo_list', checkToken, createTodo );




/**
 * @swagger
 * /user/update/todo_list/{id}:
 *      put:
 *          summary: Modifying a task
 *          description: User updates a task if any change be made
 *          tags:
 *              - TODO List
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                format: objectId
 *                schema:
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Todo'
 *          responses:
 *              200: 
 *                  description: Successful
 *              400: 
 *                  description: Failed
 *              500: 
 *                  description: Internal Server Error
 */
router.put('/user/update/todo_list/:id', checkToken, updateTodo );





/**
 * 
 * @swagger
 * /user/todo_list/completed:
 *      get:
 *          summary: Retrieve completed tasks
 *          description: User can view the list of completed tasks
 *          tags:
 *              - TODO List
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: success
 *              500:
 *                  description: Internal Server Error
 */
router.get('/user/todo_list/completed', checkToken, completedTodo );




/**
 * 
 * @swagger
 * /user/delete/todo_list/{id}:
 *      delete:
 *          summary: Deleting task(s)
 *          description: User can delete tasks not needed anymore
 *          tags:
 *              - TODO List
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                format: objectId
 *                schema:
 *                      type: string
 *          responses:
 *              200:
 *                  description: successful
 *              400: 
 *                  description: Failed
 *              500: 
 *                  description: Internal Server Error
 */
router.delete('/user/delete/todo_list/:id', checkToken, deleteTodo );




/**
 * 
 * @swagger
 * /user/todo_list/uncompleted:
 *      get:
 *          summary: Retrieve uncompleted task(s)
 *          description: User can view a list of tasks to be dealt with/completed
 *          tags:
 *              - TODO List
 *          security: 
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: successful
 *              500:
 *                  description: Internal Server Error
 */
router.get('/user/todo_list/uncompleted', checkToken, uncompletedTodo );




/**
 * 
 * @swagger
 * /user/AllImages:
 *      get:
 *          summary: Viewing all Images
 *          description: User can view all images added
 *          tags:
 *              - Images
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: successful
 */
router.get('/user/AllImages', checkToken, getAllImages );




/**
 * 
 * @swagger
 * /user/add_image:
 *      post:
 *          summary: Adding new files or Images
 *          description: User can add a new Image or file
 *          tags:
 *              - Images
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              image:
 *                                  type: string
 *                                  format: binary
 *                                  description: Image file to upload
 *          responses:
 *              200:
 *                  description: Successful Upload
 */
router.post('/user/add_image', checkToken, upload.array( "image", 12 ),  postImage );




/**
 * 
 * @swagger
 * /user/getAll/notes/notebook:
 *      get:
 *          summary: Retrieving all the user's notes
 *          description: User is able to view all the notes created
 *          tags:
 *              - NoteBook
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: ok
 *              404:
 *                  description: Not Found
 *              500:
 *                  description: Internal Server Error
 */
router.get('/user/getAll/notes/notebook', checkToken, getAllNotes );



/**
 * 
 * @swagger
 * /user/create/note/notebook:
 *      post:
 *          summary: Creating new note(s)
 *          description: User has the ability to create a new note
 *          tags:
 *              - NoteBook
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Notebook'
 *          responses:
 *              201:
 *                  description: created
 *              500: 
 *                  description: Internal Server Error
 */
router.post('/user/create/note/notebook', checkToken, createNote );



/**
 * 
 * @swagger
 * /user/modify/note/{id}:
 *      put:
 *          summary: Editing saved note(s)
 *          description: User can modify notes
 *          tags:
 *              - NoteBook
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                format: objectId
 *                schema:
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Notebook'
 *          responses:
 *              200: 
 *                  description: ok
 *              404: 
 *                  description: Not Found
 *              500: 
 *                  description: Internal Server Error
 *          
 */
router.put('/user/modify/note/:id', checkToken, updateNote );




/**
 * 
 * @swagger
 * /user/search/note/category/notebook/{category}:
 *      get:
 *          summary: Searching for notes using category
 *          description: User can search for a note using the category field
 *          tags:
 *              - NoteBook
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: category
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *              200: 
 *                  description: ok
 *              404: 
 *                  description: Not Found
 *              500: 
 *                  description: Internal Server Error
 * 
 */
router.get('/user/search/note/category/notebook/:category', checkToken, searchNote );




/**
 * 
 * @swagger
 * /user/delete/note/notebook/{id}:
 *      delete:
 *          summary: Deleting note(s)
 *          description: User can delete unwanted notes
 *          tags:
 *              - NoteBook
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                format: objectId
 *                schema:
 *                      type: string
 *          responses:
 *              200:
 *                  description: ok
 *              404: 
 *                  description: Not Found
 *              500: 
 *                  description: Internal Server Error
 */
router.delete('/user/delete/note/notebook/:id', checkToken, deleteNote );

export default router;