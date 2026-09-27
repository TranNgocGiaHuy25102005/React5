import { combineReducers, createStore } from 'redux';
import { QuanLySinhVienReducer } from './reducers/QuanLySinhVienReducer';

const rootReducer = combineReducers({
    QuanLySinhVienReducer
});

export const store = createStore(rootReducer);