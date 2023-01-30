import { ReactNode } from "react";
import { ChildrenAsProps } from "../../common/types";
import "./ModalPopup.styles.css";

interface ModalPopupProps extends ChildrenAsProps {}

const ModalPopup = ({ children }: ModalPopupProps) => {
  return <div className="overlay">{children}</div>;
};

export default ModalPopup;
