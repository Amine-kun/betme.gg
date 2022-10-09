import React from 'react';
import './GamesTable.scss';
import './GameState.scss';

import {files} from '../../Assets';
import profile from '../../Assets/profile.jpg';

export const GameState = ({bg, tournament, status}) => {

	return (
		<div className="gamestate_main app-flex" style={{backgroundColor:bg}}>	
			<img src={files.League} alt="game" className="game-icon"/>
			
			<div className="players app-flex">
				<div className="player app-flex">
					<img src={profile} alt="game" className="player-pp"/>
					<h5 className="playername">Aminedesu</h5>
					<span className="score"><h6>2:0</h6></span>
				</div>
				<h5>VS</h5>
				<div className="player app-flex">
					<span className="score"><h6>2:0</h6></span>
					<h5 className="playername">NiggerMrty</h5>
					<img src={profile} alt="game" className="player-pp"/>
				</div>
			</div>

			{tournament 
				? <span className={`timer ${status === "win" && "winner"}`}>
						<h6>{status}</h6>
				  </span>
				: <span className="timer">
						<h6>10:23</h6>
					</span>}

		</div>
	)
}

const GamesTable = ({children, setShowMore, showMore}) => {

	return (
		<>
		<div className='games'>
			{children}
		 </div>
		 <span className="bar" onClick={()=>setShowMore(!showMore)} style={{alignSelf:'center'}}></span>
		</>
	)
}

export default GamesTable;