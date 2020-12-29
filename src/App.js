import React, {useState, useEffect} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { auth, handleUserProfile } from './firebase/utils'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import SignIn from './pages/SignIn'
import Login from './pages/Login'
import './default.scss'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
      if(!userAuth){
        setCurrentUser(null)
      }else{
        const userRef = await handleUserProfile(userAuth)
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      }
    })

    return () => {
      authListener()
    }
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={() => (
          <MainLayout currentUser={currentUser}>
            <HomePage />
          </MainLayout>)
        }/>
        <Route path='/registration' render={() => (
          <MainLayout currentUser={currentUser}>
            <SignIn />
          </MainLayout>)
        }/>
        <Route 
          path='/login' 
          render={() => currentUser? <Redirect to='/'/> : (
            <MainLayout currentUser={currentUser}>
              <Login />
            </MainLayout>)}
          />
      </Switch>
    </div>
  );
}

export default App;
