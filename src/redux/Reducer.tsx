import ListItemSlice from './features/ListItemSlice';
import { combineReducers } from '@reduxjs/toolkit';
// NOTE: If wanting to add localStorage for homelayout you can add prestored state in index
const rootReducer = combineReducers({
    itemSelected: ListItemSlice,
});
export default rootReducer;