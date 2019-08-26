import React, { Component } from "react";
import { Navigation } from "components/navigation/navigation";
import { Userslist } from "components/userslist/userslist";

export class Application extends Component {
  constructor(props) {
    super(props);
    this.dataProvider = props.dataProvider;
  }

  render() {
    return (
      <div>
        <header>
          <Navigation />
        </header>
        <main>
          <Userslist dataProvider={this.dataProvider} />
        </main>
        <footer></footer>
      </div>
    );
  }
}
