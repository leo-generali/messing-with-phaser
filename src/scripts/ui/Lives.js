import { h } from "preact";
import Spritesheet from "react-responsive-spritesheet";
import livesImg from "../../assets/img/life_bar.png";
import heartImg from "../../assets/img/heart.png";

const Lives = ({ lives }) => {
  return (
    <div className="ui-heart-container">
      <img src={livesImg} />
      {[...Array(lives).keys()].map((_, index) => (
        <Heart left={42 + index * 27} />
      ))}
    </div>
  );
};

const Heart = ({ left }) => {
  return (
    <Spritesheet
      style={{ left: left }}
      className="ui-heart"
      image={heartImg}
      widthFrame={18}
      heightFrame={14}
      steps={8}
      fps={10}
      autoplay={true}
      loop={true}
      onLoopComplete={spritesheet => {
        spritesheet.goToAndPause(1);
        setTimeout(() => {
          spritesheet.play();
        }, 3000);
      }}
    />
  );
};

export default Lives;
