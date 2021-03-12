import SignIn from "./components/SignIn";
import AccountPage from "./components/AccountPage";
import {useState} from "react";

export default function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userData, setUserData] = useState("");

    function handleSignIn(data) {
        setIsSignedIn(true);
        setUserData(data);
    }

    return (
        <div>
            {isSignedIn? <AccountPage userId={userData._id} userData = {userData} /> : <SignIn onSignIn={(data) => handleSignIn(data)}/>}
        </div>
    )
}