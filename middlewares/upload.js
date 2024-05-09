import multer from "multer";
import path from "path";


//Multer Configuration
var storage = multer.diskStorage(
    {
        // Defining the destination folder to store uploaded files
        destination: function( req, file, cb ) {
            cb( null, "uploads/" );
        },
        // Defining the filename for the uploaded file
        filename: function( req, file, cb) {
            // Generating a unique filename based on the current timestamp and original file extension
            let ext = path.extname( file.originalname )
            cb( null, Date.now() + ext );
        },
    }
)

var upload = multer( { 
    storage: storage,
    // Defining a file filter function to accept only certain file types
    fileFilter: function( req, file, callback ) {
        if ( file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ) {
            callback( null, true );
        }else{
            console.log( "Only jpg, jpeg and png files are supported" );
            callback( null, false );
        }
    },
    // Defining limits for file size
    limits: {
        fileSize: 1024 * 1024 * 2
    }
 } );


 export default upload;