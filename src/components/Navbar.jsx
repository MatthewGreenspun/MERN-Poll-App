import {useState} from "react";

export default function Navbar(props) {
    const [isOnMyPolls, setIsOnMyPolls] =  useState(false);
    const blueUnderline = {borderBottom: "5px solid #3fb4fc"};
    const underline = {borderBottom: "5px solid transparent"};

    return (
        <nav className = "navbar">
            <div className="logo nav-item">Polling App</div>
            <div  className = "nav-item nav-tab" style={isOnMyPolls? blueUnderline : underline} onClick = {() => setIsOnMyPolls(true)} >My Polls</div>
            <div className = "nav-item nav-tab" style = {!isOnMyPolls? blueUnderline : underline}  onClick = {() => setIsOnMyPolls(false)} >All Polls</div>
        </nav>
    );
}