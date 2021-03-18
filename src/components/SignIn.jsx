import { useState } from "react";
import axios from "axios";

export default function SignIn(props) {
  const [id, setId] = useState("");
  const [idUserError, setIdUserError] = useState("");
  const [username, setUsername] = useState("username");
  const [usernameError, setUsernameError] = useState("");

  async function handleIdSubmit(e) {
    e.preventDefault();
    try {
      const apiRes = await axios.get(
        `http://localhost:5000/users/${id === "" ? "fakeid" : id}`
      );
      console.log(apiRes);
      setIdUserError("");
      props.onSignIn(apiRes.data);
    } catch (err) {
      setIdUserError("You entered an invalid id");
    }
  }

  async function handleNewUserSubmit(e) {
    e.preventDefault();
    if (username.length < 5) {
      setUsernameError("Username must be 5 characters");
      return;
    } else {
      try {
        const newUserId = await axios.post("http://localhost:5000/users/add", {
          username,
        });
        console.log(newUserId);
        const newUserData = await axios.get(
          `http://localhost:5000/users/${newUserId.data.id}`
        );
        props.onSignIn(newUserData.data);
        console.log(newUserData);
      } catch (err) {
        setUsernameError("that username already exists");
      }
    }
  }

  return (
    <div className="sign-in-page">
      <form className="sign-in-form">
        <h2>Enter your user ID:</h2>
        <input
          type="text"
          className="form-input"
          id="id-input"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <p className="error-txt">{idUserError}</p>
        <button
          type="submit"
          id="sign-in-btn"
          onClick={(e) => handleIdSubmit(e)}
        >
          Sign In
        </button>
        <br />
        <p className="create-new-account">or create a new account below</p>
        <input
          type="text"
          className="form-input"
          id="id-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p className="error-txt">{usernameError}</p>
        <button
          type="submit"
          id="sign-in-btn"
          onClick={(e) => handleNewUserSubmit(e)}
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
