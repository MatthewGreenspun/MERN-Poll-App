import UserApp from "./components/UserApp";
import {BrowserRouter as Router, Route} from "react-router-dom";

export default function App() {
  return (
    <div className = "app">
      <Router>
        <Route path = "/" component = {UserApp}/>
      </Router>
    </div>
  );
}