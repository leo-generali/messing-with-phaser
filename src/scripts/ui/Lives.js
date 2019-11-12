import { h } from "preact";
import livesImg from "../../assets/img/life_bar.png";
import heartImg from "../../assets/img/heart.png";

const Lives = ({ lives }) => {
  return (
    <div style={{ position: "relative" }}>
      <img
        style={{ width: "250%", imageRendering: "pixelated" }}
        src={livesImg}
      />
      {[...Array(lives).keys()].map((_, index) => (
        <Heart left={46 + index * 27} />
      ))}
    </div>
  );
};

const Heart = ({ left }) => {
  return (
    <div style={{ color: "red", position: "absolute", top: 28, left: left }}>
      ♥
    </div>
  );
};

export default Lives;
