import axios from "axios";
import {useEffect, useState} from "react";
import PollItem from "./PollItem";

export default function Poll(props) {
    const {pollTitle, pollItems, id} = props.pollObj;
    const [totalVotes, setTotalVotes] = useState(0);
    const [hasVoted, setHasVoted] = useState(false);
    const [selection, setSelection] = useState(null);

    useEffect(() => {
        let tmpTotalVotes = 0;
        for(const {votes} of pollItems) tmpTotalVotes += votes;
        setTotalVotes(tmpTotalVotes);
    }, [pollItems]);

    async function handleVote(option) {
        if(hasVoted) return;
        const body = {id, option}
        const response = await axios.post("http://localhost:5000/users/updatepoll/603708852cdd127a245dd23f", body);
        console.log(response);
        setHasVoted(true);
        setSelection(option);
    }

    return (
        <div className="poll">
            <h2 className = "poll-title">{pollTitle} <span id = "total-votes">{`${totalVotes} vote${totalVotes !== 1? "s" : ""}`}</span></h2> 
            {pollItems.map((pollItemObj, i) => (
                <PollItem 
                    key = {i} 
                    onVote = {(option) => handleVote(option)}
                    pollItemObj = {{
                        ...pollItemObj,
                        percentage: Math.floor(pollItemObj.votes/totalVotes*100)? Math.floor(pollItemObj.votes/totalVotes*100) : 0,
                        selection
                    }} 
            />))}
        </div>
    );
}