import { Link } from "react-router-dom";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";

export default function PostCard(props) {
  return (
    <Link to={"/post/" + props.id}>
      <div className="full-post-card">
        <div className="post-card-img">
          {props.image ? (
            <img src={props.image} alt="" />
          ) : (
            <ImageNotSupportedOutlinedIcon sx={{ width: 60, height: 60 }} />
          )}
        </div>
        <div className="postCard">
          <h2>{props.title}</h2>
          <h5 className="dateStamp">{props.date}</h5>
          <p>
            {props.content.length > 200
              ? props.content.slice(0, 200) + "..."
              : props.content}
          </p>
          <ul>
            <li>{props.likes} likes</li>
            <li>{props.comments} comments</li>
            <li>{props.views} views</li>
          </ul>
        </div>
      </div>
    </Link>
  );
}
