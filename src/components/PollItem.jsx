import { useState } from "react";

export default function PollItem(props) {
  const { itemName, votes, percentage, selection } = props.pollItemObj;
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    props.onVote(itemName);
    if (selection === null) setIsSelected(true);
  };

  return (
    <div
      className="poll-item"
      onClick={() => handleClick()}
      style={
        isSelected ? { borderColor: "#aec7f5", background: "#035efc" } : {}
      }
    >
      <h3 className="poll-item-name">{itemName}</h3>
      <p className="poll-item-stats">{`${percentage}% ${votes} vote${
        votes !== 1 ? "s" : ""
      }`}</p>
    </div>
  );
}
