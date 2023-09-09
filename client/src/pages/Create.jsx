import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Create() {
  const [text, setText] = useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setText((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function sendData() {
    if (text.title && text.content) {
      const day = new Date().getDate();
      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      const hour = new Date().getHours();
      const minute = new Date().getMinutes();
      const date = `${months[month]} ${day}, ${year} ${hour}:${minute} `;
      // const date = new Date().toUTCString();

      axios
        .post("/posts", {
          ...text,
          dateOfCreation: date,
          likes: 0,
          views: 0,
          comments: [],
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return (
    <div className="create-container">
      <h3>Title</h3>
      <input onChange={handleChange} type="text" id="postTitle" name="title" />
      <h3>Content</h3>
      <textarea
        onChange={handleChange}
        id="postContent"
        name="content"
        rows="4"
        cols="50"
      ></textarea>
      <br />
      <button onClick={sendData} className="postBtn">
        <Link to="/">Post</Link>
      </button>
    </div>
  );
}
