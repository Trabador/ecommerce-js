import { Switch, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import SignIn from './pages/SignIn'
import './default.scss'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={() => (
          <MainLayout>
            <HomePage />
          </MainLayout>)
        }/>
        <Route path='/registration' render={() => (
          <MainLayout>
            <SignIn />
          </MainLayout>)
        }/>
      </Switch>
    </div>
  );
}

export default App;
