import mongoose from "mongoose";




const Profile = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    idDocument: {
        type: String,
        required: true,
    },
    

});


export default mongoose.model('Profile', Profile);
