import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cors from 'cors';
import morgan from 'morgan';
import { PORT, mongoDBURL } from './config.js';
import User from './models/user.js';
import upload from './uploadConfig.js';
import { Resend } from 'resend';

const app = express();
const resend = new Resend('re_3XoS7epQ_2cvHcg1jFmM1oHg38uYiqShB');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

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

app.post('/register', async (req, res) => {
  const { email, password,} = req.body;

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
      otpExpiry
    });

    await user.save();
    await sendOtpEmail(email, otp);

    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/email-confirmation', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({ message: "Email confirmed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/profile', async (req, res) => {
  const { email, firstname, lastname } = req.body;
  try {
    const existuser = await User.findOne({ email });
    if (!existuser) {
      return res.status(400).json({ message: "User not found" });
    }

    existuser.firstname = firstname;
    existuser.lastname = lastname;
    
    await existuser.save();
    res.status(200).json({ message: "Details updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
    console.log('mediaPath:', mediaPath);

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
