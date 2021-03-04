import React, { useEffect } from 'react'
import { useSelector, useDispatch }  from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { auth, handleUserProfile } from './firebase/utils'
import { setCurrentUserAction } from './redux'
//HOC
import WithAuth from './hoc/withAuth'
//Layout
import MainLayout from './layouts/MainLayout'
//Pages
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'
import Recovery from './pages/Recovery'
import Dashboard from './pages/Dashboard'
import Coffee from './pages/Coffee'
import Tea from './pages/Tea'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import UserLayout from './layouts/UserLayout'
import Purchase from './pages/Purchase'
//Styles
import './default.scss'

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
            <UserLayout>
              <Dashboard />
            </UserLayout>
          </WithAuth>
          )}
        />
        <Route path='/coffee' render={() => (
            <UserLayout>
              <Coffee />
            </UserLayout>
          )}
        />
        <Route path='/tea' render={() => (
            <UserLayout>
              <Tea />
            </UserLayout>
          )}
        />
        
        <Route path='/product/:type/:productId' render={() => (
            <UserLayout>
              <ProductDetails />
            </UserLayout>
          )}
        />
        <Route path='/cart' render={() => (
          <WithAuth>
            <UserLayout>
              <Cart />
            </UserLayout>
          </WithAuth>
          )}
        />
        <Route path='/purchase' render={() => (
          <WithAuth>
            <UserLayout>
              <Purchase />
            </UserLayout>
          </WithAuth>
        )}
        />
      </Switch>
    </div>
  );
}

export default App;
