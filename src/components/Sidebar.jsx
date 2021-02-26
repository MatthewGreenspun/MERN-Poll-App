import useDate from "../hooks/useDate";
export default function Sidebar(props) {
    const {username, totalVotes, dateJoined} = props.sidebarObj;
    return (
        <section className="sidebar">
            <h2>{username}</h2>
            <h4>Total votes: {totalVotes}</h4>
            <h4>Joined on {useDate(dateJoined)}</h4>
        </section>
    );
}