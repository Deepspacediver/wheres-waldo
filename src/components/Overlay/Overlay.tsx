import "./Overlay.styles.css";
import { ChildrenAsProps } from "../../common/types";

interface OverlayProps extends ChildrenAsProps {}

const Overlay = ({ children }: OverlayProps) => {
  return <div className="overlay">{children}</div>;
};

export default Overlay;
