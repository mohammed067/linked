import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer'; // For handling file uploads
import { PORT, mongoDBURL } from './config.js';
import User from './models/user.js';
import upload from './uploadConfig.js'; // Multer configuration
import { Resend } from 'resend';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const resend = new Resend('re_3XoS7epQ_2cvHcg1jFmM1oHg38uYiqShB');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads')); // Serve uploaded files

mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

// Function to send OTP email using Resend
const sendOtpEmail = async (email, otp) => {
  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
      headers: {
        'X-Entity-Ref-ID': '123456789',
      },
      tags: [
        {
          name: 'category',
          value: 'confirm_email',
        },
      ],
    });
  } catch (error) {
    throw new Error('Error sending OTP email');
  }
};

// User registration endpoint
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password.length <= 5) {
    return res.status(400).json({ error: "Password must be greater than 5 characters" });
  }

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 60 * 1000; // OTP valid for 1 minute

    const user = new User({
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      profile
    });

    await user.save();
    await sendOtpEmail(email, otp);

    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Email confirmation endpoint
app.post('/email-confirmation', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp != otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // user.otp = null;
    // user.otpExpiry = null;
    await user.save();

    res.status(200).json({ message: "Email confirmed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/get/:email',async(req,res)=>{
  try{
    const user=await User.findOne({email: req.params.email});
    if(!user){
      return res.status(400).json({ error: "No such user"})
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

// Update user profile endpoint
app.post('/profile', async (req, res) => {
  const { email, firstname, lastname } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    existingUser.firstname = firstname;
    existingUser.lastname = lastname;

    await existingUser.save();
    res.status(200).json({ message: "Details updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a new post endpoint with media upload
app.post('/post', upload.single('media'), async (req, res) => {
  const { title, userId } = req.body;

  if (!title || !userId) {
    return res.status(400).json({ error: 'Title and userId are required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

    const mediaPath = req.file ? req.file.path : null;

    user.posts.push({
      title,
      media: mediaPath
    });

    await user.save();
    res.status(200).json({ message: 'Post added successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



//editing profile such as photo



// Edit profile such as photo
// Edit profile such as photo
app.post('/edit', upload.single('media'), async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const mediaPath = req.file ? req.file.path : null;
    user.profile = mediaPath;
    await user.save(); // Corrected this line

    return res.status(200).json({ message: "Profile picture uploaded successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ error: 'user not exist' });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Wrong email or password' });
    }

    // Password matches, return the user object or other data as needed
    return res.status(200).json({ user: existingUser });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Comment on a post endpoint
app.post('/comment', async (req, res) => {
  const { userId, postId, text } = req.body;

  if (!userId || !postId || !text) {
    return res.status(400).json({ error: 'userId, postId, and text are required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const post = user.posts.id(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.push({ user: userId, text });
    await user.save();

    res.status(200).json({ message: 'Comment added successfully', post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;
