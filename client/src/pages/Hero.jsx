import SouthIcon from '@mui/icons-material/South';

export default function Home() {
  function goDown() {
    window.scrollTo({
      left: 0,
      top: 620,
      behavior: "smooth",
    });
  }
  
  return (
    <div className="hero">
      <h1 className="hero-title">The Daily Dose Blog</h1>
      <p className="hero-content">
        Your daily dose of creativity is only one click away
      </p>
      <button className="hero-btn" onClick={goDown} type="button">
        <SouthIcon />
      </button>
    </div>
  );
}
