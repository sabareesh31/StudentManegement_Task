import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import List from './components/List';
import HeaderComponent from './components/HeaderComponent';
import Create from './components/Create';
import Update from './components/Update';
// import View from './components/ViewEmployeeComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {List}/>
                          <Route path = "/employees" component = {List}/>
                          <Route path = "/add-employee/:id" component = {Create}/>
                          {/* <Route path = "/view-employee/:id" component = {View}/> */}
                          <Route path = "/update-employee/:id" component = {Update}/>
                    </Switch>
                </div>
        </Router>
    </div>
    
  );
}

export default App;
