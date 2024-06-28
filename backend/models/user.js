import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: Number },
  otpExpiry: { type: Date },
  posts: [
    {
      title: { type: String, required: true },
      media: { type: String },
      likes: { type: Number, default: 0 },
      comments: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          text: { type: String, required: true },
          createdAt: { type: Date, default: Date.now }
        }
      ],
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

const User = mongoose.model('User', userSchema);

export default User;
