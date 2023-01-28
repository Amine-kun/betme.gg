import React,{useState, useEffect} from 'react';
import './GamesTable.scss';
import './GameState.scss';

import {files} from '../../Assets';
import profile from '../../Assets/profile.jpg';

export const GameState = ({bg, isFinished, game, getParty}) => {

	const [players, setPlayers] = useState({winner:null, loser:null})
	const [status, setStatus] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let party = getParty();
		let winner;
		let loser;
		let players = game['players']
		for(let i =0; i<players.length;i++){
			if(players[i].team === game.result){
				winner.push(players[i])
			} else{
				loser.push(players[i])
			}

			if(players[i].username === party.username && players[i].team === game.result){
				setStatus('win')
			} else{
				setStatus('lose')
			}
		}
		setPlayers({winner:winner, loser:loser})
		setLoading(true);
	}, [])

	return (
		<div className="gamestate_main app-flex" style={{backgroundColor:bg}}>	
			<img src={files.League} alt="game" className="game-icon"/>
			
			<div className="players app-flex">
				<div className="player app-flex">
					<img src={winner[0].profile_picture} alt="game" className="player-pp"/>
					<h5 className="playername">{winner[0].username}</h5>
					<span className="score"><h6>{status ? '1:0' : '0:1'}</h6></span>
				</div>
				<h5>VS</h5>
				<div className="player app-flex">
					<span className="score"><h6>{status ? '1:0' : '0:1'}</h6></span>
					<h5 className="playername">{loser[0].username}</h5>
					<img src={loser[0].profile_picture} alt="game" className="player-pp"/>
				</div>
			</div>

			{isFinished 
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