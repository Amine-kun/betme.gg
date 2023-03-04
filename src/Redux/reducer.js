import {configureStore} from '@reduxjs/toolkit';
import gamesReducer from './games';

export default configureStore({
	reducer : {
		games: gamesReducer,
	},
});