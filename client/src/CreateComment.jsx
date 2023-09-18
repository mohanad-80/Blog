import { useState } from "react";
import ErrorBox from "./ErrorBox";

export default function CreateComment(props) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);

  function handleChange(e) {
    setComment(e.target.value);
  }

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 5000);
  }

  return (
    <div className="create-comment">
      <textarea
        onChange={handleChange}
        placeholder="Add a comment"
        name="comment"
        value={comment}
        rows="4"
        // cols="40"
      ></textarea>
      <br />
      <button
        onClick={() => {
          comment ? props.onCommentAdded(comment) : setError(true);
          setComment("");
        }}
        variant="outlined"
        className="new"
      >
        Submit
      </button>
      {error && <ErrorBox message="Please write something to be published" />}
    </div>
  );
}
