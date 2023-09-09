import { Link } from "react-router-dom";

export default function PostCard(props) {
  return (
    <Link to={"/post/" + props.id}>
      <div className="postCard">
        <h2>{props.title}</h2>
        <h5 className="dateStamp">{props.date}</h5>
        <p>
          {props.content.length > 100
            ? props.content.slice(0, 100) + "..."
            : props.content}
        </p>
        <ul>
          <li>{props.likes} likes</li>
          <li>{props.comments} comments</li>
          <li>{props.views} views</li>
        </ul>
      </div>
    </Link>
  );
}
