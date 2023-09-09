export default function ErrorBox(props) {
  return (
    <div className="error-box">
      <h4>Error</h4>
      <p>{props.message}</p>
    </div>
  );
}
