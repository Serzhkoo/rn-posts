import { applyMiddleware, combineReducers, createStore } from 'redux';
import { postReducer } from './reducers/post-reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  post: postReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppStateType = ReturnType<typeof rootReducer>