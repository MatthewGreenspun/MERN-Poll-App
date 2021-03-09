import {useState} from "react";
import axios from "axios";

export default function NewPollForm(props) {
    const [pollTitle, setPollTitle] = useState("My Poll");
    const [pollOptions, setPollOptions] = useState([]);

    function deleteOption(optionName){
        setPollOptions(pollOptions.filter((option) => option !== optionName));
    }

    function addOption(optionName) {
        let newOptions = pollOptions;
        newOptions.push(optionName);
        setPollOptions([...newOptions]);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let pollJSONForBackend = {pollTitle, pollOptions: {}};
        pollOptions.forEach((option) => pollJSONForBackend.pollOptions[option] = 0);
        console.log(pollJSONForBackend);
        axios.post("http://localhost:5000/users/newpoll/603708852cdd127a245dd23f", pollJSONForBackend);
        props.onSubmit();
    }

    return (
        <div className = "poll" id="poll-creator">
            <div className="form-title-container">
                <h2>Title: </h2>
                <input type="text" className="poll-form-title form-input" onChange={(e) => setPollTitle(e.target.value)} value={pollTitle}/>
            </div>
            <h2>Options: </h2>
            <div className="poll-form-options">
                {pollOptions.map((option, i) => <PollOption 
                    className = "poll-form-option"
                    key = {i}
                    name = {option} 
                    onDelete = {(optionName) => deleteOption(optionName)}
                />)}
                <PollOptionCreator onAddOption={(optionName) => addOption(optionName)}/> 
            </div>
            <form>    
                <button type = "submit" className="create-poll-btn" onClick = {(e) => handleSubmit(e)}>Create Poll</button>
            </form>
        </div>
    )
}

function PollOption(props) {
    const {name} = props;
    return (
        <div className = "poll-form-option" onClick = {(() => props.onDelete(name))}>
            <h2>{name}</h2>
        </div>
    )
}

function PollOptionCreator(props) {
    const [name, setName] = useState("");

    const handleChange = (e) => setName(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onAddOption(name);
        setName("");
    }

    return (
        <div className="poll-form-option-creator">
            <form onSubmit={handleSubmit}>
                <input type="text" className="form-input" value = {name} onChange={handleChange}/>
            </form>
        </div>
    )
}