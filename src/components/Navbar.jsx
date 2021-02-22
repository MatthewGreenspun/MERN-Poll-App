import {Link} from "react-router-dom"

export default function Navbar(props) {
    const {id} = props;
    return (
        <nav className = "navbar">
            <div className="logo nav-item">Polling App</div>
            <Link to = {"/users" + id} className = "nav-item nav-tab">My Polls</Link>
            <Link to = "/users" className = "nav-item nav-tab">All Polls</Link>
        </nav>
    );
}