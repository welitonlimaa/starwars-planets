import './animation.css';

// animação encontrada em: https://cssanimation.rocks/starwars/
function Animation() {
  return (
    <div className="starwars-demo">
      <img
        src="//cssanimation.rocks/demo/starwars/images/star.svg"
        alt="Star"
        className="star"
      />
      <img
        src="//cssanimation.rocks/demo/starwars/images/wars.svg"
        alt="Wars"
        className="wars"
      />
    </div>
  );
}

export default Animation;
