import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { PORT, mongoDBURL } from './config.js';
import User from './models/user.js';
import upload from './uploadConfig.js'; // Import multer configuration

const app = express();

app.use(express.json());

// User registration endpoint
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    if (password.length <= 5) {
      return res.status(400).json({ error: "Password must be greater than 5 characters" });
    }
    const existuser = await User.findOne({ email });
    if (existuser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      user: {
        name,
        email,
        password: hashedPassword
      }
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new post endpoint with media upload
app.post('/post', upload.single('media'), async (req, res) => {
  const { title, userId } = req.query;

  try {
    // console.log('req.file:', req.file); // Log the uploaded file

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    const mediaPath = req.file ? req.file.path : null;
    console.log('mediaPath:', mediaPath); // Log the media path

    user.posts.push({
      title,
      media: mediaPath
    });

    await user.save();
    res.status(200).json({ message: "Post added successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Add a comment to a post endpoint
app.post('/comment', async (req, res) => {
  const { userId, postId, text } = req.body;

  try {
    if (!userId || !postId || !text) {
      return res.status(400).json({ error: "userId, postId, and text are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const post = user.posts.id(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.comments.push({ user: userId, text });
    await user.save();

    res.status(200).json({ message: "Comment added successfully", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Connect to MongoDB and start the server
mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
