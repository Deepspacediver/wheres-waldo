import "./FoundTag.styles.css";

interface FoundTagProps {
  left: number;
  top: number;
  name: string;
}

const FoundTag = ({ left, top, name }: FoundTagProps) => {
  return (
    <div className="found-tag" style={{ left: `${left}px`, top: `${top}px` }}>
      {name}
    </div>
  );
};

export default FoundTag;
