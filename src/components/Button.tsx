import "./Button.css";
import Icon from "../assets/images/icon-arrow.svg";
import { motion } from "framer-motion";

type ButtonProps = {
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{ backgroundColor: "var(--Off-Black)" }}
      className="btn"
      onClick={onClick}
    >
      <img src={Icon} alt="" />
    </motion.button>
  );
};

export default Button;
