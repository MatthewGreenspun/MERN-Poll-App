import {Link} from "react-router-dom";
import {useState} from "react";

export default function Navbar(props) {
    const [isOnMyPolls, setIsOnMyPolls] =  useState(false);
    const underline = {borderBottom: "5px solid blue"};
    const {id} = props;
    return (
        <nav className = "navbar">
            <div className="logo nav-item">Polling App</div>
            <Link to = {"/users" + id} className = "nav-item nav-tab" style={isOnMyPolls? underline : {}} onClick = {() => setIsOnMyPolls(true)} >My Polls</Link>
            <Link to = "/users" className = "nav-item nav-tab" style = {!isOnMyPolls? underline : {}}  onClick = {() => setIsOnMyPolls(false)} >All Polls</Link>
        </nav>
    );
}