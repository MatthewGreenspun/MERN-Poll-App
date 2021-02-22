import PollItem from "./PollItem";

export default function Poll(props) {
    const {pollTitle, pollItems} = props.pollObj;
    return (
        <div className="poll">
            <h2 className = "poll-title">{pollTitle}</h2>
            {pollItems.map((pollItemObj, i) => <PollItem key = {i} pollItemObj = {pollItemObj} />)}
        </div>
    );
}