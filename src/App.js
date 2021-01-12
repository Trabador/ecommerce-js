import React, { useEffect } from 'react'
import { useSelector, useDispatch }  from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { auth, handleUserProfile } from './firebase/utils'
import { setCurrentUserAction } from './redux'
//HOC
import WithAuth from './hoc/withAuth'
//layout
import MainLayout from './layouts/MainLayout'
//pages
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'
import Recovery from './pages/Recovery'
import Dashboard from './pages/Dashboard'
import Coffee from './pages/Coffee'
import Tea from './pages/Tea'
import './default.scss'
import Aborrar from './pages/Aborrar'

function App() {
  const currentUser = useSelector((state) => state.user.currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
      if(!userAuth){
        dispatch(setCurrentUserAction(userAuth))
      }else{
        const userRef = await handleUserProfile(userAuth)
        userRef.onSnapshot(snapshot => {
          dispatch(setCurrentUserAction({
            id: snapshot.id,
            ...snapshot.data()
          }))
        })
      }
    })

    return () => {
      authListener()
    }
  }, [dispatch])

  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={() => (
          <MainLayout>
            <HomePage />
          </MainLayout>)
        }/>
        <Route 
          path='/registration' 
          render={() => currentUser? <Redirect to=''/> : (
            <MainLayout>
              <Register />
            </MainLayout>)}
        />
        <Route 
          path='/login' 
          render={() => currentUser? <Redirect to='/'/> : (
            <MainLayout>
              <Login />
            </MainLayout>)}
        />
        <Route path='/recovery' render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
        <Route path='/dashboard' render={() => (
          <WithAuth>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </WithAuth>
          )}
        />
        <Route path='/coffee' render={() => (
            <MainLayout>
              <Coffee />
            </MainLayout>
          )}
        />
        <Route path='/tea' render={() => (
            <MainLayout>
              <Tea />
            </MainLayout>
          )}
        />
        <Route path='/agregar' render={() => (
            <MainLayout>
              <Aborrar />
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
