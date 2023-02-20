import { combineReducers } from 'redux';
import ReducerCart from './ReducerCart';
import ReducerSession from './ReducerSession';

const ReducerRoot = combineReducers({
	Cart: ReducerCart,
	Session: ReducerSession,
});

export default ReducerRoot;
