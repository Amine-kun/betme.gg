import {createSlice} from '@reduxjs/toolkit';

const gameSlice = createSlice({
	name:"games",
	initialState:{
		games:[],
	},
	reducers:{
		setGames:(state, action)=>{
			state.games = action.payload.data;
		}
	},
});

export const {setGames} = gameSlice.actions
export default gameSlice.reducer;