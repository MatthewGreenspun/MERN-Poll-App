import {useState} from "react";
import axios from "axios";

export default function SignIn(props) {
    const [id, setId] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const apiRes = await axios.get(`http://localhost:5000/users/${id===""? "fakeid": id}`);
            console.log(apiRes);
            setError("");
            props.onSignIn(apiRes.data);
        } catch (err) {
            setError("You entered an invalid id");
        }
    }

    return (
        <div className="sign-in-page">
            <form className="sign-in-form" onSubmit={(e) => handleSubmit(e)}>
                <h2>Enter your user ID:</h2>
                <input type="text" className="form-input" id="id-input" value={id} onChange={(e) => setId(e.target.value)} />
                <p className="error-txt">{error}</p>
                <button type="submit" id="sign-in-btn">Sign In</button>
            </form>
        </div>
    )
}