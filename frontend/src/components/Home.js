import "./../index.css";
import logo from "./../assets/gwestLogo.png";
const home = (props) => {
  return (
    <div className="home">
      <img className="logo" src={logo} alt="wild wild gwest logo" />
      <h4>Login or Signup to play!</h4>
      <h5>Rules:</h5>
      <p>
        When you create an account you will be given 12 cards to start out with.
      </p>
      <p>
        You will need to put these cards in your deck to play (you have to have
        at least 12 cards in your deck to play).
      </p>
      <p>You can play once you hit the battle tab.</p>
      <p>
        The goal of this game is to win 2 out of 3 rounds against the computer.
      </p>
      <p>
        Each card has a class and an attack power, the points are based on how
        much attack your current cards on the board have.
      </p>
      <p>
        Once you want to go to the next round you can click the pass button.
      </p>
      <p>You only get 10 cards so use them wisely.</p>
    </div>
  );
};

export default home;
