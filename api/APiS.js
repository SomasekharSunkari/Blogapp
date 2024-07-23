import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { UserModel } from "../api/models/User.js"; // Adjust the import path if necessary
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { fileURLToPath } from 'url';

import path from 'path';
import cookieParser from 'cookie-parser';
import { PostModel } from './models/Post.js';
import fs from 'fs';
const uploadMiddleware = multer({ dest: 'uploads/' })
const app = express();
const secre = "3432423432234243dsfsdf"

// CORS configuration
// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.get("/",(req,res)=>{
  console.log(__filename)
  console.log(__dirname+"/uploads")
})
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
  credentials: true // Allow cookies to be sent
}));
app.use(express.json());
app.use(cookieParser())
// app.use("/uploads",express.static(__dirname + '/uploads'))

// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// MongoDB URI
// const mongoURI = "mongodb+srv://sunkarisekhar36:oHlMDc2JBVamnKKb@cluster0.n22ozvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const mongoURI = "mongodb+srv://sunkarise/khar36:sekharamma@176@cluster0.n22ozvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// const mongoURI = "mongodb+srv://sunkarisekhar36:m8bq6X77MaQwZ63W@cluster0.uy19k9u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// const mongoURI = "mongodb+srv://sekhar123:yeD5MHiUfRLV1L2t@cluster0.uy19k9u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// const mongoURI = "mongodb+srv://sekhar123:yeD5MHiUfRLV1L2t@cluster0.uy19k9u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// const mongoURI = "mongodb+srv://kirab:ouQE6yJB8jD1GCyq@cluster0.uy19k9u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const mongoURI = "mongodb+srv://kirab:DYnrjelOw1S5FulX@cluster0.uy19k9u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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
        res.cookie("token", token).json({
          id:userDoc._id,
          username
        });
      }
    );
  } catch (e) {
    console.error("Error occurred during login:", e);
    res.status(500).json({ error: 'Error occurred during login' });
  }
});


app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (!token) {
      return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, secre,{}, (err, info) => {
      if (err) {
          return res.status(403).json({ error: 'Failed to authenticate token' });
      }
      res.json(info); // Send the decoded token information as JSON response
  });
});

app.post("/logout",(req,res)=>{
    res.cookie('token','').json("ok")
})
app.post("/posts",uploadMiddleware.single("file"),async(req,res)=>{
const {originalname,path} = req.file;
const parts = originalname.split(".");
const ext  = parts[parts.length -1 ];
const newPath = path+"."+ext
fs.renameSync(path,newPath)
  console.log(req.files)
  const {title,summary,content} = req.body;
 const postDoc =  await PostModel.create({
    title,
    summary,
    content,
    cover:newPath

  })
// res.json({files:req.file})
res.json(postDoc);
  
})
app.get("/post/:id",async(req,res)=>{
 const {id} = req.params;

 const user = await PostModel.findById(id)
 console.log(user)
 return res.json(user)
})
app.get("/getposts", async (req,res)=>{
  const posts = await PostModel.find({});
console.log(posts);
  return res.json(posts);
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(5000, () => {
  console.log('API Server is running on port 5000');
});
