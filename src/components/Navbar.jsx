export default function Navbar(props) {
  const blueUnderline = { borderBottom: "5px solid #3fb4fc" };
  const underline = { borderBottom: "5px solid transparent" };

  return (
    <nav className="navbar">
      <div className="logo nav-item">Polling App</div>
      <div
        className="nav-item nav-tab"
        style={props.isOnMyPolls ? blueUnderline : underline}
        onClick={() => props.onChangeTab(true)}
      >
        My Polls
      </div>
      <div
        className="nav-item nav-tab"
        style={!props.isOnMyPolls ? blueUnderline : underline}
        onClick={() => props.onChangeTab(false)}
      >
        All Polls
      </div>
    </nav>
  );
}
