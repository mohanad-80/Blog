export default function Comment(props) {
  return (
    <div className="comment">
      <div className="avatar">
        <img src="https://picsum.photos/60" alt="random pic" />
      </div>
      <div className="comment-info">
        <h4>Random user</h4>
        <p>{props.content}</p>
      </div>
    </div>
  );
}
