import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
// Components
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/home';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Router>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
          <Footer />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
