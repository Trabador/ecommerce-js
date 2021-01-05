import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './rootReducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const middlewares = [thunk, logger]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))

export default store