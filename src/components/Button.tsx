import "./Button.css";
import Icon from "../assets/images/icon-arrow.svg";

type ButtonProps = {
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      <img src={Icon} alt="" />
    </button>
  );
};

export default Button;
