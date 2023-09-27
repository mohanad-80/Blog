import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

export default function Edit() {
  const state = useLocation();
  const { title, content, image, id } = state.state;
  console.log(state.state);
  const [text, setText] = useState({
    title: title,
    content: content,
    image: image,
  });
  const postRoute = `/post/${id}`;

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
        .patch(`${process.env.REACT_APP_API_URL}/posts`, {
          ...text,
          id: id,
          dateOfModification: date,
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
      <h3>Choose an image*</h3>
      <input
        onChange={(e) => {
          const image = e.target.name;
          const img = e.target.files[0];
          var file = img;
          var reader = new FileReader();
          reader.onloadend = function () {
            let data = reader.result;
            setText((prevValue) => {
              return {
                ...prevValue,
                [image]: data,
              };
            });
            console.log(text);
          };
          reader.readAsDataURL(file); // ?????
        }}
        type="file"
        accept="image/.jpg, image/.jpeg, image/.png"
        name="image"
      />
      <h3>Title</h3>
      <input
        onChange={handleChange}
        type="text"
        id="postTitle"
        name="title"
        value={text.title}
      />
      <h3>Content</h3>
      <textarea
        onChange={handleChange}
        id="postContent"
        name="content"
        rows="auto"
        cols="50"
        auto
        value={text.content}
        className="edit-text-area"
      ></textarea>
      <br />
      <button onClick={sendData} className="postBtn">
        <Link to={postRoute}>Save</Link>
      </button>
      <button className="postBtn" style={{ width: 50, marginLeft: 10 }}>
        <Link to={postRoute}>Cancel</Link>
      </button>
    </div>
  );
}
