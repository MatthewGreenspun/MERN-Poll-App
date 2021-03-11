import axios from "axios";
import Navbar from "./components/Navbar";
import Poll from "./components/Poll";
import Sidebar from "./components/Sidebar";
import NewPollForm from "./components/NewPollForm";
import {useState, useEffect} from "react";

export default function App() {
    const [user, setUser] = useState(null);
    const [totalVotes, setTotalVotes] = useState(0);
    const [isOnMyPolls, setIsOnMyPolls] = useState(true); 
    const [polls, setPolls] = useState([]);
    const [isAddingPoll, setIsAddingPoll] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
            const apiRes = await axios.get("http://localhost:5000/users/603708852cdd127a245dd23f");
            const json = JSON.parse(apiRes.request.response);
            console.log(json);

            let tmpTotalVotes = 0;
            let tmpPolls = [];
            json.polls.forEach((poll) => {
                let newPollObj = {pollTitle: poll.pollTitle, id: poll.id, pollItems: []};
                Object.keys(poll.pollOptions).forEach((option) => {
                    tmpTotalVotes += poll.pollOptions[option];
                    newPollObj.pollItems.push({itemName: option, votes: poll.pollOptions[option]});
                });
                tmpPolls.push(newPollObj);
            });

            setPolls(tmpPolls);
            setTotalVotes(tmpTotalVotes)
            setUser(json);
        }
        fetchUserData();
    }, [])
    return (
        <section className = "user-app">
            <Navbar 
                isOnMyPolls = {isOnMyPolls}
                onChangeTab = {(tab) => setIsOnMyPolls(tab)}
            />
            <div className = "user-profile">
                {isOnMyPolls && <Sidebar 
                    sidebarObj = {{
                        username: user === null? "Loading ..." : user.username, 
                        totalVotes: user === null? 0 : totalVotes,
                        numberOfPolls: polls.length,
                        dateJoined: user === null? null : user.createdAt.slice(0,10),
                    }} 
                />}
                <section className = "polls">
                    {polls.map((poll, i) => (
                        <Poll 
                            key = {i}
                            pollObj = {poll}
                        />
                    ))}
                    {!isAddingPoll && <div><div onClick = {() => setIsAddingPoll(true)} className = "poll" style={{marginBottom: "1rem"}}>
                        <h2>+ Add Poll</h2>
                    </div><br /></div>}
                    {isAddingPoll && <NewPollForm 
                        onSubmit = {() => setIsAddingPoll(false)}
                    />}
                </section>
            </div>
        </section>
    );
}