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
  Collapse,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
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
  const [liked, setLiked] = useState(false);

  const params = useParams();

  useEffect(() => {
    if (localStorage.getItem(params.id)) {
      setLiked(true);
    }
  }, [params.id]);

  // for the three dots menu
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

  // for the animation of the create comment section
  // #########################
  const [checked, setChecked] = useState(false);

  const openCreateSection = () => {
    setChecked((prev) => !prev);
  };
  // #########################

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/post/` + params.id)
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
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
      axios
        .patch(`${process.env.REACT_APP_API_URL}/post/` + params.id, { likes: likes + 1 })
        .then(() => {
          console.log("done");
        })
        .catch((err) => {
          console.log(err);
        });
      localStorage.setItem(params.id, "true");
    } else {
      setLikes(likes - 1);
      setLiked(false);
      axios
        .patch(`${process.env.REACT_APP_API_URL}/post/` + params.id, { likes: likes - 1 })
        .then(() => {
          console.log("done");
        })
        .catch((err) => {
          console.log(err);
        });
      localStorage.removeItem(params.id);
    }
  }

  function addComment(comment) {
    axios
      .post(`${process.env.REACT_APP_API_URL}/post/` + params.id, { comment: comment })
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
      .delete(`${process.env.REACT_APP_API_URL}/post/` + params.id)
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
          <div className="dateStamp">
            <h5>
              <strong>Created at: </strong>
              {post.dateOfCreation}
            </h5>
            {post.dateOfModification && (
              <h5>
                <strong>Edited at:</strong> {post.dateOfModification}
              </h5>
            )}
          </div>
          <pre>{`${post.content}`}</pre>
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
              disableScrollLock
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "10ch",
                },
              }}
            >
              <Link
                to={"/edit"}
                state={{
                  id: params.id,
                  title: post.title,
                  content: post.content,
                }}
              >
                <MenuItem>Edit</MenuItem>
              </Link>
              <Link to="/">
                <MenuItem onClick={deletePost}>Delete</MenuItem>
              </Link>
            </Menu>
          </div>
          {/* ############## */}
          <ul className="stat">
            <li>
              <Chip
                icon={liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                label={likes}
                onClick={increaseLiks}
                variant="outlined"
              />
            </li>
            <li>
              <Chip
                icon={<ModeCommentOutlinedIcon />}
                label={comments.length}
                variant="outlined"
                onClick={openCreateSection}
              />
            </li>
            <li>
              <Chip
                icon={<RemoveRedEyeOutlinedIcon />}
                label={post.views}
                variant="outlined"
              />
            </li>
          </ul>
          <hr />
          <Collapse in={checked}>
            <CreateComment onCommentAdded={addComment} />
          </Collapse>
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
