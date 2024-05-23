import Notes from "../models/notesModel.js";
import Category from "../models/categoryModel.js";
import NoteCategory from "../models/notecategoryModel.js";


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



export async function createCategory ( req, res ) {
    const newcat = new Category ( {
        userId: req.user._id,
        name: req.body.name,
    });

    try {
        const create = await newcat.save();
        res.status( 201 ).json( { status: "successful", message: "Category successfully added", data: create } );
    } catch (error) {
        res.status( 500 ).json( { message: error.message } );
    }
}


export async function createNote ( req, res ){

    try {
        const { title, content, categories } = req.body;

        let categoryNames = [];

        // Convert single category string to array if needed
        if (typeof categories === 'string') {
            categoryNames.push(categories);
        } else if (Array.isArray(categories)) {
            categoryNames = categories;
        } 

        // Array to store category ids
        const categoryIds = [];

        
        // Create the note
        const newNote = new Notes({
            userId: req.user._id,
            title,
            content,
            categories: categoryIds
        } );
        await newNote.save();

        // Loop through the categories
        for (const categoryName of categoryNames) {
            let category = await Category.findOne({ name: categoryName });

            // If category does not exist, create a new one
            if (!category) {
                category = new Category({ userId: req.user._id, name: categoryName });
                await category.save();
            }

            // Save category id
            categoryIds.push(category._id);

            // Link category to note in NoteCategory model
            const noteCategory = new NoteCategory({
                userId: req.user._id,
                categoryId: category._id,
                noteId: newNote._id  // We will update this later
            });
            await noteCategory.save();
        }


        // Update noteId in NoteCategory model
        for (const categoryId of categoryIds) {
            await NoteCategory.updateMany(
                { userId: req.user._id, categoryId, noteId: null },
                { noteId: newNote._id }
            );
        }

        res.status( 201 ).json( { status: "successful", message: "Note successfully created", data: newNote } );
    } catch (error) {
        console.log(error)
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
        const notes = await NC.find( { userId, category }, { _id: 0, userId: 0, category: 0 } );
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