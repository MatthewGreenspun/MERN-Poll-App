export default function Sidebar(props) {
    const {username, totalVotes} = props.sidebarObj;
    return (
        <section className="sidebar">
            <h2>{username}</h2>
            <h4>{totalVotes} total votes</h4>
        </section>
    );
}