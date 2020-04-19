import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import AddItemlist from './Components/AddItemlist';
import AllTaskItems from './Components/AllTaskItems';
import MarkTaskItem from './Components/MarkTaskItem';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tokenId: localStorage.getItem("token"),
    }
  }
  render() {
    let token = this.state.tokenId
    return (
      <div>
        <Router>
          <Route path="/" exact render={(props) => { return <Home {...props} /> }} />
          <Route path="/login" exact render={(props) => { return <Login {...props} /> }} />
          <Route path="/signup" exact render={(props) => { return <Signup {...props} /> }} />
          <Route path="/home" exact render={(props) => token ? (<AddItemlist {...props} />) : (<Redirect to='/login' />)} />
          <Route path="/addtaskItem/:tasklist_id" exact render={(props) => token ? (<AllTaskItems {...props} />) : (<Redirect to='/login' />)} />
          <Route path="/marktaskItem/:tasklist_id" exact render={(props) => token ? (<MarkTaskItem {...props} />) : (<Redirect to='/login' />)} />
        </Router>
      </div>
    )
  }
}


export default App;
