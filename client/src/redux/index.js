import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import AdminReducer from './reducer/adminReducer';
import studentReducer from './reducer/studentReducer';
import professeurReducer from './reducer/professeurReducer'
import usersReducer from './reducer/usersReducer'
import classesReducer from './reducer/classRoomReducer'
import groupesReducer from './reducer/groupesReducer'
import levelReducer from './reducer/levelReducer'
import groupeClassReducer from './reducer/groupeClassReducerr'

const middleware = [thunk];

const reducer = combineReducers({

user : AdminReducer,
students: studentReducer,
professeurs:professeurReducer,
users:usersReducer,
classes:classesReducer,
groupes:groupesReducer,
levels:levelReducer,
groupeClasses:groupeClassReducer,
});


const store = createStore(reducer,
    compose(applyMiddleware(...middleware)));
 /*    
const store = createStore(reducer,
    compose(applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()));
      
*/
export default store;