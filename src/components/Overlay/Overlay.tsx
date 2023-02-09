import { forwardRef } from "react";
import { ChildrenAsProps } from "../../common/types";
import "./Overlay.styles.css";

interface OverlayProps extends ChildrenAsProps {}

const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ children }, ref) => {
    return (
      <div ref={ref} className="overlay">
        <div className="overlay__modal-wrapper">{children}</div>
      </div>
    );
  }
);

export default Overlay;
