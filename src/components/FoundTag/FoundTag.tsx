import "./FoundTag.styles.css";

interface FoundTagProps {
  left: number;
  top: number;
  name: string;
}

const FoundTag = ({ left, top, name }: FoundTagProps) => {
  return (
    <div className="found-tag" style={{ left: `${left}%`, top: `${top}%` }}>
      {name}
    </div>
  );
};

export default FoundTag;
