export default function Comment(props) {
  let time;
  let timeName;
  let timeInMs = Date.now() - props.time;
  let timeInSec = Math.round(timeInMs / 1000);

  if (timeInSec < 60) {
    time = timeInSec; // time in sec
    timeName = "Second";
  } else if (timeInSec >= 60 && timeInSec < 3600) {
    time = Math.round(timeInSec / 60); // time in mins
    timeName = "Minute";
  } else if (timeInSec >= 3600 && timeInSec < 86400) {
    time = Math.round(timeInSec / 3600); // time in hours
    timeName = "Hour";
  } else if (timeInSec >= 86400 && timeInSec < 2592000) {
    time = Math.round(timeInSec / 86400); // time in days
    timeName = "Day";
  } else if (timeInSec >= 2592000 && timeInSec < 31104000) {
    time = Math.round(timeInSec / 2592000); // time in months
    timeName = "Month";
  } else if (timeInSec >= 31104000) {
    time = Math.round(timeInSec / 31104000); // time in years
    timeName = "Year";
  }

  if (time === 1) {
    timeName += " ago";
  } else {
    timeName += "s ago";
  }

  return (
    <div className="comment">
      <div className="avatar">
        <img src="https://picsum.photos/60" alt="random pic" />
      </div>
      <div className="comment-info">
        <h4>
          Random user{"  "}
          <span className="comment-time-stamp">{time + " " + timeName}</span>
        </h4>

        <p>{props.content}</p>
      </div>
    </div>
  );
}
