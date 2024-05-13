import Notes from "../models/notesModel.js";


export async function getAllNotes ( req, res ) {
    const userId = req.user._id;
    try {
        const note = await Notes.find( {userId }, { _id: 0 } );
        if (note.length === 0 ) {
            return res.status( 404 ).json( { status: "Success", message: "No note(s) to display" } );
        }
        res.status( 200 ).json( { status: "Success", data: note } );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function createNote ( req, res ){
    const newNote = new Notes ( {
        userId: req.user._id,
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
    } );

    try {
        const create = await newNote.save();
        res.status( 201 ).json( { status: "successful", message: "Note successfully created", data: create } );
    } catch (error) {
        res.status( 500 ).json( { message: error.message } );
    }
}


export async function updateNote ( req, res ) {
    const userId = req.user._id;
    try {
        const modifNote =await Notes.findByIdAndUpdate( req.params.id, req.body, { userId, new: true, fields: { _id: 0, userId: 0 } } );
        if (!modifNote) {
            res.status( 404 ).json( { status: "failed", message: "Note does not exist" } );
        }
        res.status( 200 ).json( { status: "Successful", message: "Note Successfully updated", data: modifNote } );
    } catch (error) {
        res.status( 500 ).json( { status: "Error", message: error.message } );
    }
}


export async function searchNote ( req, res ) {
    const userId = req.user._id;
    const category = req.params.category
    try {
        const notes = await Notes.find( { userId, category }, { _id: 0, userId: 0, category: 0 } );
    if ( notes.length === 0 ) {
        return res.status(404).json({ status: "Failed", message: "No Notes were found under the category" + " " + category } );
    }
        res.status(200).json({ status: "Success", message: "Notes found under the category" + " " + category , notes});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}


export async function deleteNote ( req, res ) {
    const userId = req.user._id;
    try {
        const Notedelete = await Notes.findByIdAndDelete( req.params.id, { userId } );
        if (!Notedelete) {
            res.status( 404 ).json( { status: "failed", message: "Note not found. Cannot delete" } );
        }
        res.status( 200 ).json( { status: "Successful", message: "Note successfully deleted" } );
    } catch (error) {
        res.status( 500 ).json( { status: "Error", message: error.message } );
    }
}