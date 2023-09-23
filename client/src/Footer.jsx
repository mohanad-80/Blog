export default function Footer() {
  return (
    <div className="footer">
      <p>Version: 1.3.0</p>
      <p>
        Made by
        <span style={{ fontStyle: "italic" }}>
          <a href="https://github.com/mohanad-80"> Mohanad Ahmed</a>
        </span>
      </p>
      <p>Copyright © {new Date().getFullYear()} All rights reserved</p>
    </div>
  );
}
