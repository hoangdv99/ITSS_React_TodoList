import './App.css';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Home from './components/home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Todo from './components/Todo';
import PrivateRoute from './components/PrivateRoute';

function App() {
  
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <PrivateRoute path="/" exact component={Todo} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App;
