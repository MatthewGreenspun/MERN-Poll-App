export default function PollListSorter(props) {
    const {numberOfPolls} = props;

    return (
        <div className="poll-list-sorter">
            <div style={{display: "flex", alignItems:"center", marginLeft: "0.5rem"}}>
            <h4>Sort By: </h4>
            <select style={{marginLeft: "10px"}} onChange={(e) => props.onSortingChange(e.target.value)}>
                <option value="Old - New">Old - New</option>
                <option value="New - Old">New - Old</option>
                <option value="Votes Ascending">Votes Ascending</option>
                <option value="Votes Descending">Votes Descending</option>
            </select>
            </div>
            <span id = "total-votes">{`${numberOfPolls} poll${numberOfPolls !== 1? "s" : ""}`}</span>
        </div>
    )
}