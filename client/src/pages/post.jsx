import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Comment from "../Comment";
import CreateComment from "../CreateComment";
import ErrorBox from "../ErrorBox";

import {
  IconButton,
  Menu,
  MenuItem,
  Backdrop,
  CircularProgress,
  Chip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

const ITEM_HEIGHT = 48;

export default function Post() {
  const [post, setPost] = useState({});
  const [likes, setLikes] = useState();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [commentError, setCommentError] = useState(false);

  const params = useParams();

  // #########################
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // #########################

  useEffect(() => {
    axios
      .get("/post/" + params.id)
      .then((response) => {
        setPost(response.data);
        setLikes(response.data.likes);
        setComments(response.data.comments);
        setTimeout(() => {
          setLoading(false);
        }, "800");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, [params.id]);

  function increaseLiks() {
    setLikes(likes + 1);
    axios
      .patch("/post/" + params.id, { likes: likes + 1 })
      .then(() => {
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addComment(comment) {
    axios
      .post("/post/" + params.id, { comment: comment })
      .then((response) => {
        console.log(response.data);
        setComments((prevValue) => {
          return [...prevValue, comment];
        });
        setCommentError(false);
      })
      .catch((err) => {
        console.log(err);
        setCommentError(true);
      });
  }

  function deletePost() {
    axios
      .delete("/post/" + params.id)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="full postCard">
      {error ? (
        <ErrorBox message="Failed to load the post... please try again." />
      ) : loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div>
          <h2>{post.title}</h2>
          <h5 className="dateStamp">{post.dateOfCreation}</h5>
          <p>{post.content}</p>
          {/* ############## */}
          <div className="menuBtn">
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "10ch",
                },
              }}
            >
              <MenuItem onClick={handleClose}>Edit</MenuItem>
              <Link to="/">
                <MenuItem onClick={deletePost}>Delete</MenuItem>
              </Link>
            </Menu>
          </div>
          {/* ############## */}
          <ul className="stat">
            <li>
              <Chip
                icon={<ThumbUpOutlinedIcon />}
                label={likes}
                onClick={increaseLiks}
                variant="outlined"
              />
              {/* <button onClick={increaseLiks}>👍</button> {likes} likes */}
            </li>
            <li>
              <Chip
                icon={<ModeCommentOutlinedIcon />}
                label={comments.length}
                variant="outlined"
              />
              {/* {comments.length} comments */}
            </li>
            <li>
              <Chip
                icon={<RemoveRedEyeOutlinedIcon />}
                label={post.views}
                variant="outlined"
              />
              {/* {post.views} views */}
            </li>
          </ul>
          <hr />
          <CreateComment onCommentAdded={addComment} />
          {commentError && (
            <ErrorBox message="Failed to save the comment... please try again." />
          )}
          <p>Comments:</p>
          {comments.map((comment, idx) => {
            return <Comment key={idx} content={comment} />;
          })}
        </div>
      )}
    </div>
  );
}
