import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { UserModel } from "../api/models/User.js"; // Adjust the import path if necessary
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const secre = "3432423432234243dsfsdf"

// CORS configuration
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());

// MongoDB URI
const mongoURI = "mongodb+srv://sunkarisekhar36:oHlMDc2JBVamnKKb@cluster0.n22ozvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const userDoc = await UserModel.create({ username, password: hashedPassword });
    res.status(201).json(userDoc);
  } catch (e) {
    console.error("Error occurred while creating user:", e);
    res.status(500).json({ error: 'Error occurred while creating user' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await UserModel.findOne({ username });

    if (!userDoc) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passOK = bcrypt.compareSync(password, userDoc.password);

    if (!passOK) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    jwt.sign(
      { username, id: userDoc._id },
      process.env.JWT_SECRET ||secre ,
      {},
      (err, token) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to generate token' });
        }
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' }).json("ok");
      }
    );
  } catch (e) {
    console.error("Error occurred during login:", e);
    res.status(500).json({ error: 'Error occurred during login' });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(5000, () => {
  console.log('API Server is running on port 5000');
});
