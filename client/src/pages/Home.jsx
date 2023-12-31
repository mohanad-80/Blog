import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../PostCard";
import {
  Autocomplete,
  TextField,
  Alert,
  AlertTitle,
  Backdrop,
  CircularProgress,
} from "@mui/material";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchedTitle, setSearchedTitle] = useState();

  const filteredPosts = searchedTitle
    ? posts.filter((post) => post.title === searchedTitle)
    : posts;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts`)
      .then(function (response) {
        response.data.reverse();
        setPosts(response.data);
        setTimeout(() => {
          setLoading(false);
        }, "1000");
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <div className="postsContainer">
      <Autocomplete
        sx={{ width: 400 }}
        id="free-solo-demo"
        freeSolo
        options={posts.map((option) => option.title)}
        renderInput={(params) => (
          <TextField {...params} label="Search title" variant="standard" />
        )}
        onChange={(event, value, reason) => {
          if (reason === "selectOption") {
            setSearchedTitle(value);
          } else if (reason === "clear") {
            setSearchedTitle("");
          }
        }}
      />

      {error ? (
        <Alert variant="filled" severity="error">
          <AlertTitle>Error</AlertTitle>Failed to load the posts! - please try
          again.
        </Alert>
      ) : loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        filteredPosts.map((post) => {
          return (
            <PostCard
              key={post._id}
              id={post._id}
              title={post.title}
              content={post.content}
              image={post.image && post.image}
              date={post.dateOfCreation}
              likes={post.likes}
              comments={post.comments.length}
              views={post.views}
            />
          );
        })
      )}
    </div>
  );
}
