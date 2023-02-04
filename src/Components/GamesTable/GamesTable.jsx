import React,{useState, useEffect} from 'react';
import './GamesTable.scss';
import './GameState.scss';
import {useLocation} from 'react-router-dom';

import {files} from '../../Assets';

export const GameState = ({bg, isFinished, game}) => {

	const [players, setPlayers] = useState({winner:null, loser:null})
	const [status, setStatus] = useState(null);
	const [loading, setLoading] = useState(false);

	const location = useLocation();
	const path = location.pathname.split("/")[2];

	const getUser =()=>{
		const user = localStorage.getItem("userinfo")
		                      ? JSON.parse(localStorage.getItem("userinfo"))
		                      : null 

        return user;
	}

	useEffect(() => {
		let get_user = getUser();

		let winner=[];
		let loser=[];
		let players = game['players']

		for(let i =0; i<players.length;i++){
			if(players[i].team === game.result){
				winner.push(players[i])
			} else{
				loser.push(players[i])
			}

			if(players[i].id === parseInt(path)){

				if(players[i].team === game.result){
					setStatus('win')
				} else {
					setStatus('lose')
				}
			}
		}
		setPlayers({winner:winner, loser:loser})
		setLoading(false);

		return ()=>{
			setStatus(null);
			setPlayers({winner:null, loser:null});
			setLoading(true);
		}
	}, [path])


	return (
		<>
		{!players.winner && <p>waiting ....</p>}
		{players.winner && 
			<div className="gamestate_main app-flex" style={{backgroundColor:bg}}>	
				<img src={files.League} alt="game" className="game-icon"/>
				
				<div className="players app-flex">
					<div className="player app-flex">
						<img src={players?.winner[0].profile_picture.split(" ").join("")} alt="game" className="player-pp"/>
						<h5 className="playername">{players?.winner[0].username}</h5>
						<span className="score"><h6>{status ? '1:0' : '0:1'}</h6></span>
					</div>
					<h5>VS</h5>
					<div className="player app-flex">
						<span className="score"><h6>{status ? '1:0' : '0:1'}</h6></span>
						<h5 className="playername">{players?.loser[0].username}</h5>
						<img src={players?.loser[0].profile_picture.split(" ").join("")} alt="game" className="player-pp"/>
					</div>
				</div>

				{isFinished 
					? <span className={`timer ${status === "win" && "winner"}`}>
							<h6>{status}</h6>
					  </span>
					: <span className="timer">
							<h6>10:23</h6>
						</span>}

			</div>}
		</>
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