import "./TagLabel.css";

interface TagLabelProps {
  children: string;
  active?: boolean;
}

const TagLabel = ({ children = "", active }: TagLabelProps) => {
  return (
    <div className={`tag-label${active ? " active" : ""}`}>
      <p>{children}</p>
    </div>
  );
};

export default TagLabel;
