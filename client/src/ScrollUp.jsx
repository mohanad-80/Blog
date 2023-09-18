import NorthIcon from '@mui/icons-material/North';

export default function ScrollUp() {
  window.onload = () => {
    let btn = document.querySelector(".scroll-up");

    window.onscroll = function () {
      if (window.scrollY >= 600) {
        btn.classList.remove("hide");
      } else {
        btn.classList.add("hide");
      }
    };
  };

  function goUp() {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button type="button" onClick={goUp} className="scroll-up hide">
      <NorthIcon></NorthIcon>
    </button>
  );
}
