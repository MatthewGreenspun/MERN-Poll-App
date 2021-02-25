import axios from "axios";
import Navbar from "./components/Navbar";
import Poll from "./components/Poll";
import Sidebar from "./components/Sidebar";
import {useState, useEffect} from "react";

export default function App() {
    return (
        <section className = "user-app">
            <Navbar />
            <div className = "user-profile">
                <Sidebar sidebarObj = {{username: "Test User", totalVotes: 827}} />
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