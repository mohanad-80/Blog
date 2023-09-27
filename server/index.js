import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";

const app = express();
const PORT = 5000;

const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(bodyParser.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({ extended: true }));

// conecting with MongoDB
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// creating the schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  dateOfCreation: String,
  dateOfModification: String,
  likes: Number,
  views: Number,
  comments: [],
});

const Post = mongoose.model("Post", postSchema);

const postsRoute = app.route("/posts");
const postRoute = app.route("/post/:id");

postsRoute.get((req, res) => {
  Post.find({})
    .then((foundPosts) => {
      res.send(foundPosts);
    })
    .catch((err) => {
      res.send(err);
    });
});

postsRoute.post((req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    dateOfCreation: req.body.dateOfCreation,
    likes: req.body.likes,
    views: req.body.views,
  });

  post
    .save()
    .then(() => {
      res.status(201).send("post saved");
    })
    .catch((err) => {
      res.send(err);
    });
});

postsRoute.patch((req, res) => {
  Post.findByIdAndUpdate(req.body.id, {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    dateOfModification: req.body.dateOfModification,
  })
    .then(() => {
      res.send("post edited");
    })
    .catch((err) => {
      res.send(err);
    });
});

postRoute.get((req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then((foundPost) => {
      foundPost.views += 1;
      foundPost.save();
      res.send(foundPost);
    })
    .catch((err) => {
      res.send(err);
    });
});

postRoute.post((req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: req.body } },
    { new: true }
  )
    .then(() => {
      res.send("comment saved");
    })
    .catch((err) => {
      res.send(err);
    });
});

postRoute.patch((req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    { likes: req.body.likes },
    { new: true }
  )
    .then(() => {
      res.send();
    })
    .catch((err) => {
      res.send(err);
    });
});

postRoute.delete((req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => {})
    .catch((err) => {
      res.send(err);
    });
});

// listening on the port after connecting to MongoDB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});
