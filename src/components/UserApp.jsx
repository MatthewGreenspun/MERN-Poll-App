import Navbar from "./Navbar";
import Poll from "./Poll";
import Sidebar from "./Sidebar";

export default function UserApp() {
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