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
    image: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setText((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
    console.log(text);
    console.log(typeof text.image);
  }

  function sendData() {
    if (text.title && text.content && text.image) {
      const day = new Date().getDate();
      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      const hour = new Date().getHours();
      const minute = new Date().getMinutes();
      const date = `${months[month]} ${day}, ${year} ${hour}:${minute} `;
      // const date = new Date().toUTCString();

      axios
        .post(`${process.env.REACT_APP_API_URL}/posts`, {
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
          };
          reader.readAsDataURL(file); // ?????
        }}
        type="file"
        accept="image/.jpg, image/.jpeg, image/.png"
        name="image"
      />
      <br />
      <h3>Title*</h3>
      <input onChange={handleChange} type="text" id="postTitle" name="title" />
      <br />
      <h3>Content*</h3>
      <textarea
        onChange={handleChange}
        id="postContent"
        name="content"
        rows="4"
        cols="50"
        style={{ resize: "vertical" }}
      ></textarea>
      <br />
      <Link to="/">
        <button onClick={sendData} className="postBtn">
          Post
        </button>
      </Link>
    </div>
  );
}

// function encodeImageFileAsURL(img) {
//   var file = img;
//   var reader = new FileReader();
//   reader.onloadend = function () {
//     console.log("RESULT", reader.result);
//   };
//   reader.readAsDataURL(file);
// }
