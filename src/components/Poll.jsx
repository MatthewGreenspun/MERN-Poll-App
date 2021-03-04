import {useEffect, useState} from "react";
import PollItem from "./PollItem";

export default function Poll(props) {
    const {pollTitle, pollItems} = props.pollObj;
    const [totalVotes, setTotalVotes] = useState(0);
    useEffect(() => {
        let tmpTotalVotes = 0;
        for(const {votes} of pollItems) tmpTotalVotes += votes;
        setTotalVotes(tmpTotalVotes);
    }, []);

    return (
        <div className="poll">
            <h2 className = "poll-title">{pollTitle}</h2>
            <h2>{`${totalVotes} total vote${totalVotes !== 1? "s" : ""}`}</h2>
            {pollItems.map((pollItemObj, i) => (
                <PollItem 
                    key = {i} 
                    pollItemObj = {{
                        itemName: pollItemObj.itemName, 
                        votes: pollItemObj.votes, 
                        percentage: Math.floor(pollItemObj.votes/totalVotes*100)? Math.floor(pollItemObj.votes/totalVotes*100) : 0
                    }} 
            />))}
        </div>
    );
}