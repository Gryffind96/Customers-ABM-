import React, { Component } from 'react'
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import './App.css';
import HomeContainer from './containers/HomeContainer';
import CustomersContainer from './containers/CustomersContainer';
import CustomerContainer from './containers/CustomerContainer';
import NewCustomerContainer from './containers/NewCustomerContainer';
class App extends Component {


  renderHome = ()=> < HomeContainer />;

  renderCustomerContainer = ()=> <h1> Customer Container</h1>;

  renderCustomerListContainer = ()=> <CustomersContainer />;

  renderCustomerNewContainer = ()=> <h1>Customer new Container</h1>

  render() {
    return (
      <Router>
        <div className="App">
            <Switch>
              <Route path="/customers/new" component={NewCustomerContainer} />
              <Route path="/customers/:dni" 
                render={ props => <CustomerContainer
                  dni={props.match.params.dni} />} />
              <Route path="/customers" component={this.renderCustomerListContainer} />
              <Route path="/" component={this.renderHome} />
            </Switch>
        </div>
      </Router>
    )
  }
}


export default App;
