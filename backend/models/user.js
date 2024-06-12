import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    user:
    {
        name: {
            type: String,
            required: true,

        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },


    }
    ,

    posts: [
        {
            title: {
                type: String,
                required: true
            },
            media: {
                type: String,
                required: false
            },
            likes: {
                type: Number,
                default: 0
            },
            comments: [
                {
                    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                    text: { type: String, required: true },
                    createdAt: { type: Date, default: Date.now }
                }
            ],
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
});


const User = mongoose.model('userprofiles', userSchema);


export default User;
