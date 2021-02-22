export default function PollItem(props) {
    const {itemName, votes, percentage} = props.pollItemObj;
    return (
        <div className="poll-item">
            <h3 className = "poll-item-name">{itemName}</h3>
            <p className="poll-item-stats">{`${percentage}% ${votes} vote${votes !== 1? "s" : ""}`}</p>
        </div>
    );
}