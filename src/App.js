import React from "react";
import Main from "./Components/MainComponent";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
