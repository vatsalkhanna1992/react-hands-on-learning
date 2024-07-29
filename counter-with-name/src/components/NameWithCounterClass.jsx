import React from "react";

export class NameWithCounterClass extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      age: 0
    }
  }

  render() {
    return (
      <form>
        <input value={this.state.name} onChange={e => this.setState({name: e.target.value})} />
        <div>
          <button onClick={(e) => {
            e.preventDefault()
            if (this.state.age > 0) {
              this.setState({age: this.state.age - 1});
            }
          }}>-</button>

          {this.state.age}

          <button onClick={(e) => {
            e.preventDefault()
            this.setState({age: this.state.age + 1});
          }}>+</button>
        </div>
        <div>
          My name is {this.state.name} and I am {this.state.age} years old.
        </div>
      </form>
    );
  }
}
