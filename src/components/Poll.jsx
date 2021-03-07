import {useEffect, useState} from "react";
import PollItem from "./PollItem";

export default function Poll(props) {
    const {pollTitle, pollItems, id} = props.pollObj;
    const [totalVotes, setTotalVotes] = useState(0);
    useEffect(() => {
        let tmpTotalVotes = 0;
        for(const {votes} of pollItems) tmpTotalVotes += votes;
        setTotalVotes(tmpTotalVotes);
        //eslint-disable-next-line
    }, []);

    return (
        <div className="poll">
            <h2 className = "poll-title">{pollTitle} <span id = "total-votes">{`${totalVotes} vote${totalVotes !== 1? "s" : ""}`}</span></h2> 
            {pollItems.map((pollItemObj, i) => (
                <PollItem 
                    key = {i} 
                    pollItemObj = {{
                        ...pollItemObj,
                        percentage: Math.floor(pollItemObj.votes/totalVotes*100)? Math.floor(pollItemObj.votes/totalVotes*100) : 0
                    }} 
            />))}
        </div>
    );
}