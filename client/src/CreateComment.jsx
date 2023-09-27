import { useState } from "react";
import ErrorBox from "./ErrorBox";

export default function CreateComment(props) {
  const [comment, setComment] = useState({
    content: "",
    timeStamp: Date.now(),
  });
  const [error, setError] = useState(false);

  function handleChange(e) {
    setComment((prevValue) => {
      return {
        ...prevValue,
        content: e.target.value,
      };
    });
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
        value={comment.content}
        rows="4"
        // cols="40"
      ></textarea>
      <br />
      <button
        onClick={() => {
          // setComment((prevValue) => {
          // let d = Date.now();
          // d = d.toString();
          // console.log(d);
          // console.log(typeof d);
          //   return {
          //     ...prevValue,
          //     timeStamp: d,
          //   };
          // });
          comment.content && comment.timeStamp
            ? props.onCommentAdded(comment)
            : setError(true);
          setComment({
            content: "",
            timeStamp: Date.now(),
          });
        }}
        className="new"
      >
        Submit
      </button>
      {error && <ErrorBox message="Please write something to be published" />}
    </div>
  );
}
