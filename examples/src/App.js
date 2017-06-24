import React from 'react';
import { connect } from 'react-redux';


class App extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>{'HELLOOOOOO'}</div>
    );
  }
}

export default connect( state => ({...state}) )( App );
