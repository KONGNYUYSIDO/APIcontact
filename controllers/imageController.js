import Image from "../models/imageModel.js";


export async function getAllImages ( req, res ) {
    const userId = req.user._id;
    try {
        const image = await Image.find( { userId }, { _id: 0, userId: 0 } );
        res.status( 200 ).json( { status: "Success", data: image } );
    } catch (error) {
        res.status( 500 ).json( { status: "Error", message: error.message } );
    }
}


export async function postImage ( req, res ) {
    const newImage = new Image ( {
        userId: req.user._id,
        fileName: req.file.originalname,
        filePath: req.file.path,
    });

    try {
        if (!req.file) {
            return res.status( 404 ).json( { error: "No file or Image selected" } );
        }
        const addImage = await newImage.save();
        res.status(201).json({ status: "Success", message: "Image added successfully", data: addImage });
    } catch (error) {
        
    }
}

