import axios from "axios";
import Navbar from "./components/Navbar";
import Poll from "./components/Poll";
import Sidebar from "./components/Sidebar";
import {useState, useEffect} from "react";

export default function App() {
    const [user, setUser] = useState(null);
    const [totalVotes, setTotalVotes] = useState(0);
    useEffect(() => {
        async function getApiData() {
            const apiRes = await axios.get("http://localhost:5000/users/603708852cdd127a245dd23f");
            const json = JSON.parse(apiRes.request.response);
            console.log(json);
            let tmpTotalVotes = 0;
            json.polls.forEach((poll) => {
                Object.keys(poll.pollOptions).forEach((option) => {
                    tmpTotalVotes += poll.pollOptions[option];
                });
            });
            setTotalVotes(tmpTotalVotes)
            setUser(json);
        }
        getApiData();
    }, [])
    return (
        <section className = "user-app">
            <Navbar />
            <div className = "user-profile">
                <Sidebar 
                    sidebarObj = {{
                        username: user === null? "Loading ..." : user.username, 
                        totalVotes: user === null? 0 : totalVotes,
                        dateJoined: user === null? null : user.createdAt.slice(0,10),
                    }} 
                />
                <section className = "polls">
                    <Poll 
                        pollObj = {{
                            pollTitle: "Favorite Letter", 
                            pollItems: [
                                {itemName: 'a', votes: 1, percentage: 25},
                                {itemName: 'a', votes: 1, percentage: 25},
                                {itemName: 'a', votes: 1, percentage: 25},
                                {itemName: 'a', votes: 1, percentage: 25},
                            ]
                        }} 
                    /> 
                </section>
            </div>
        </section>
    );
}