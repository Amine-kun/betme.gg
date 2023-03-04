import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './games';

export default configureStore({
	reducer : {
		games: gamesReducer,
	},
});