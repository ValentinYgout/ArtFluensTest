import React from "react";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Person extends React.Component {
  state = {
    persons: [],
    suggestions: [],
    inputValue: "",
  };

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      const persons = res.data;
      this.setState({ persons });
    });
  }

  handleTextChange = (e) => {
    const value = e.target.value;

    let suggestions = [];
    if (value.length > 0) {
      console.log(value, "value");
      const regex = new RegExp(`${value}`, "i");
      console.log(regex, "regex");
      suggestions = this.state.persons
        .sort()
        .filter((person) => regex.test(person.name));
    }

    this.setState(() => ({ suggestions, inputValue: value }));
    console.log({ suggestions }, "suggeston");
    console.log(this.state.persons);
  };

  handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.innerText);
    this.setState({ inputValue: e.target.innerText });
  };
  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    function changeBackground(e) {
      e.target.style.background = "red";
    }
    return (
      <ul className=" row">
        {suggestions.map((suggestion) => (
          <li
            className="Suggestions"
            onClick={this.handleClick}
            key={suggestion.id}
            onMouseOver={this.changeBackground}
          >
            {suggestion.name}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="container">
        <input
          className="input "
          onChange={this.handleTextChange}
          type="text"
          value={this.state.inputValue}
        />

        {this.renderSuggestions()}
      </div>
    );
  }
}
