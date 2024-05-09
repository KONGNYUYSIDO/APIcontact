import Contact from "../models/contactModel.js";


export async function getAllContacts( req, res ) {
    const userId = req.user._id;
    try {
        const contacts = await Contact.find( {userId }, { firstName: 1, surName: 1, emailAddress: 1, phoneNumber1: 1, phoneNumber2: 1, _id: 0 } );
        if (contacts.length === 0 ) {
            return res.status( 200 ).json( { status: "Success", message: "No contact(s) to display" } );
        }
        res.status( 200 ).json( { status: "Success", data: contacts } );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function addContact( req, res ) {
    const newContact = new Contact({
        userId: req.user._id,
        firstName: req.body.firstName,
        surName: req.body.surName,
        emailAddress: req.body.emailAddress,
        phoneNumber1: req.body.phoneNumber1,
        phoneNumber2: req.body.phoneNumber2,
        address: req.body.address,
        company: req.body.company,
        birthday: req.body.birthday,
        jobTitle: req.body.jobTitle,
        relationship: req.body.relationship,
    });

    try {
        const createdContact = await newContact.save();
        res.status(201).json({ status: "Success", message: "Contact created successfully", data: createdContact });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



export async function searchContact( req, res ) {
    const searchTerm = req.query.searchTerm;
    const userId = req.user._id;
    try {
        const contacts = await Contact.find( { userId, 
            $or: [
                { firstName: new RegExp(searchTerm, "i")},
                { surName: new RegExp(searchTerm, "i")},
                { emailAddress: new RegExp(searchTerm, "i")},
            ]
        }, { firstName: 1, surName: 1, emailAddress: 1, phoneNumber1: 1, phoneNumber2: 1, _id: 0 });
        if ( contacts.length === 0 ) {
            return res.status(404).json({ status: "Failed", message: "No Contact found with that searchTerm"});
        }
        res.status(200).json({ status: "Success", message: "Contacts found with the searchTerm", contacts});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export async function updateContact( req, res ) {
    const userId = req.user._id;
    try {
        const updatedContact = await Contact.findByIdAndUpdate( req.params.id, req.body, { userId, new: true } );
        if (!updateContact) {
            return res.status(400).json({ status: "Failed", message: "Contact not found" });
        }
        res.json({ status: "Success", message: "Contact updated successfully", data: { updatedContact } });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



export async function deleteContact( req, res ) {
    const userId = req.user._id;
    try {
        const deletedContact = await Contact.findByIdAndDelete( req.params.id, { userId } );
        if (!deletedContact) {
            return res.status(404).json({ status: "Failed", message: "Contact not found for deletion"});
        }
        res.json({ status: "Success", message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

