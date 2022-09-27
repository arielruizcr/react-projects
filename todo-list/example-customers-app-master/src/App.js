import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import CustomerContainer from './containers/CustomerContainer';
import CustomersContainer from './containers/CustomersContainer';
import HomeContainer from './components/Home';
import NewCustomerContainer from './containers/NewCustomerContainer';

class App extends Component {

  renderHome = () => <h1>Home</h1>;

  renderCustomerContainer = () => <h1>Customer Container</h1>;

  renderCustomerListContainer = () => <h1>Customers List Container</h1>;

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/customers" component={CustomersContainer} />
          <Switch>
            <Route path="/customers/new" component={NewCustomerContainer} />
            <Route path="/customers/:dni" 
                    render={props => <CustomerContainer dni={props.match.params.dni} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}
/*
function App() {
  const renderHome = () => <h1>Home</h1>
  const renderCustomerList = () => <h1>Customers List</h1>
  const renderCustomer = () => <h1>Customer dni</h1>
  const renderCustomerNew = () => <h1>Customer New</h1>
  const test = () => <s/>;
  return (
    <div className="App">
      <Router>

        <Route exact path="/" component={renderHome} />
        <Route exact path="/customers" component={renderCustomerList} />
        <Switch>
          <Route path="/customers/new" component={renderCustomerNew} />
          <Route path="/customers/:dni" component={renderCustomer} />

        </Switch>
      </Router>
    </div>
  );
}
*/

export default App;
