import Navbar from "./Navbar";
import Poll from "./Poll";
import Sidebar from "./Sidebar";
import NewPollForm from "./NewPollForm";
import PollListSorter from "./PollListSorter";
import axios from "axios";
import { useState, useEffect } from "react";

export default function AccountPage({ userId, userData }) {
  const [user, setUser] = useState(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [isOnMyPolls, setIsOnMyPolls] = useState(true);
  const [polls, setPolls] = useState([]);
  const [pollsOrder, setPollsOrder] = useState("Old - New");
  const [isAddingPoll, setIsAddingPoll] = useState(false);

  function formatUserData(userDataJson) {
    let tmpTotalVotes = 0;
    let tmpPolls = [];
    userDataJson.polls.forEach((poll) => {
      let newPollObj = {
        pollTitle: poll.pollTitle,
        id: poll.id,
        pollItems: [],
        totalVotes: 0,
        polsterId: userDataJson._id,
      };
      Object.keys(poll.pollOptions).forEach((option) => {
        tmpTotalVotes += poll.pollOptions[option];
        newPollObj.totalVotes += poll.pollOptions[option];
        newPollObj.pollItems.push({
          itemName: option,
          votes: poll.pollOptions[option],
        });
      });
      tmpPolls.push(newPollObj);
    });

    return [tmpTotalVotes, tmpPolls];
  }

  async function fetchUserData() {
    const userDataJson = await axios.get(
      `http://localhost:5000/users/${userId}`
    );
    const [newTotalVotes, newPolls] = formatUserData(userDataJson.data);
    setPolls(newPolls);
    setTotalVotes(newTotalVotes);
    setUser(userDataJson.data);
    setPollsOrder("Old - New");
  }

  async function fetchAllPolls() {
    const allUsersJson = await axios.get("http://localhost:5000/users");
    let allUsersPolls = [];
    allUsersJson.data.forEach((user) => {
      user.polls.forEach((poll) => {
        let newPollObj = {
          pollTitle: poll.pollTitle,
          id: poll.id,
          pollItems: [],
          totalVotes: 0,
          polsterId: user._id,
        };
        Object.keys(poll.pollOptions).forEach((option) => {
          newPollObj.totalVotes += poll.pollOptions[option];
          newPollObj.pollItems.push({
            itemName: option,
            votes: poll.pollOptions[option],
          });
        });
        allUsersPolls.push(newPollObj);
      });
    });
    setPolls(allUsersPolls);
    setPollsOrder("Old - New");
  }

  useEffect(() => {
    const json = userData;
    if (json.polls === undefined) return;
    const [newTotalVotes, newPolls] = formatUserData(json);

    setPolls(newPolls);
    setTotalVotes(newTotalVotes);
    setUser(json);
  }, [userData]);

  useEffect(() => {
    if (isOnMyPolls) {
      fetchUserData();
    } else {
      fetchAllPolls();
    }
    //eslint-disable-next-line
  }, [isOnMyPolls]);

  function handlePollOrderChange(sortingOrder) {
    if (sortingOrder === "Old - New")
      setPolls(polls.sort((poll1, poll2) => poll1.id - poll2.id));
    if (sortingOrder === "New - Old")
      setPolls(polls.sort((poll1, poll2) => poll2.id - poll1.id));
    if (sortingOrder === "Votes Ascending")
      setPolls(
        polls.sort((poll1, poll2) => poll1.totalVotes - poll2.totalVotes)
      );
    if (sortingOrder === "Votes Descending")
      setPolls(
        polls.sort((poll1, poll2) => poll2.totalVotes - poll1.totalVotes)
      );
    setPollsOrder(sortingOrder);
  }

  return (
    <section className="user-app">
      <Navbar
        isOnMyPolls={isOnMyPolls}
        onChangeTab={(tab) => setIsOnMyPolls(tab)}
      />
      <div className="user-profile">
        {isOnMyPolls && (
          <Sidebar
            sidebarObj={{
              username: user === null ? "Loading ..." : user.username,
              userId,
              totalVotes: user === null ? 0 : totalVotes,
              numberOfPolls: polls.length,
              dateJoined: user === null ? null : user.createdAt.slice(0, 10),
            }}
          />
        )}
        <section className="polls">
          <PollListSorter
            numberOfPolls={polls.length}
            value={pollsOrder}
            onSortingChange={(sortingOrder) =>
              handlePollOrderChange(sortingOrder)
            }
          />

          {polls.map((poll, i) => (
            <Poll
              key={i}
              userId={poll.polsterId}
              pollObj={poll}
              onVoteConfirmed={() => fetchUserData()}
            />
          ))}

          {!isAddingPoll && isOnMyPolls && (
            <div
              onClick={() => setIsAddingPoll(true)}
              className="poll"
              style={{ marginBottom: "1rem" }}
            >
              <h2>+ Add Poll</h2>
            </div>
          )}
          {isAddingPoll && isOnMyPolls && (
            <NewPollForm
              onSubmit={() => setIsAddingPoll(false)}
              onConfirmedPollAdded={() => fetchUserData()}
              userId={userId}
            />
          )}
        </section>
      </div>
    </section>
  );
}
