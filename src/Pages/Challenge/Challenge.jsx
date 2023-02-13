import React, {useState, useEffect} from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import './Challenge.scss';
import {useNavigate} from 'react-router-dom';
import useAxios from '../../utils/useAxios';

import Loading from '../../Components/Loading/Loading';
import {files} from '../../Assets';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import {BiErrorAlt} from 'react-icons/bi';
import {BsFillCircleFill} from 'react-icons/bs';
import {IoIosAddCircle} from 'react-icons/io';
import {MdOutlineClose, MdDoneAll} from 'react-icons/md';
import {HiOutlineEmojiSad} from 'react-icons/hi';

const gamesData = [{name:'League of legends', icon:files.lol, modes:['1V1','5V5','2v2 BOTLANE']},
				   {name:'Apex', icon:files.apexWalp, modes:['1V1','TEAM VS TEAM','2v2']},
				   {name:'Streetfighter', icon:files.streetfighter, modes:['1V1', '3V3']},
				   {name:'Valorant', icon:files.valo, modes:['1V1','5V5']}]


const Challenge = ({setShowFriends,e, userData, getParty, lobbyPlayers, ws}) => {

	 const [currentGame, setCurrentGame] = useState(gamesData[0].name);
	 const [mode, setMode] = useState(null);
	 const [placedBet, setPlacedBet] = useState(10);
	 const [status, setStatus] = useState(false);

	 const [message, setMessage] = useState('start a bet ...');
	 const [loading, setLoading] = useState(true);
	 const [party, setParty] = useState(null);
	 const [betProgress, setBetProgress] = useState('init');

	 const api = useAxios();
	 const navigate = useNavigate();

	 useEffect(() => {
	 	let getP= getParty();
	 	setParty(getP);
	 	setLoading(false);
	 }, [])

	 useEffect(()=>{
	 	// if(ws !== null){
	 	// 	const data = {currentGame:currentGame, mode:mode, placedBet:placedBet}
		//  		ws.send(JSON.stringify({"verb":"mode", "user":userData, "team":party.team, "data":data}))

		//  		ws.onmessage=(event)=>{
		// 	 	if(event.data === 'START'){
		// 	 		// let validate = checkPLayersValidity();
			 		
		// 	 		// if(validate.status === 'pass'){
		// 	 		// 	startBet();
		// 	 		// } else {
		// 	 		// 	console.log(validate.reason)
		// 	 		// }

		// 	 		startBet();
		// 	 	}
		// 	 }
	 	// }

	 },[placedBet, currentGame,mode])

	 const controlPlacedBet = (e) =>{
	 		 e.target.value > 100 ? console.log('too high') :setPlacedBet(e.target.value);
	 		 return 0
	 		}

	 const checkPLayersValidity = () =>{
	 	const res = api.post(`api/validation/`,{
	 		gameId : party.id,
	 		placedBet : placedBet
	 	});
	 	const result = res.json();
	 	return result.data
	 }

	 const startBet = ()=>{
	 	if(!status){
	 		setStatus(true);

	 		setBetProgress('init');
	 		setMessage('start a bet ...');

	 		var client = new W3CWebSocket(`ws://localhost:8080/?user=${userData.username}&game=${party.id}&players=${parseInt(mode[0])+parseInt(mode[2])}`);

		 	client.onopen =(data) =>{
		 		setStatus(true);
		 		return setMessage('Validating players...')
		 	}
		 	client.onmessage = (event) =>{
				 if(event.data === 'WIN'){
				 	setBetProgress('win');

				 	if(party.status === 'creator'){
				 		api.post('/api/match/',{
					 		placedBet:placedBet,
					 		game:currentGame,
					 		mode:mode,
					 		players:lobbyPlayers,
					 		result:'A',
					 		timestamp:15
					 	}).then(res=>console.log('saved')).catch(err=>console.log(err))
				 		
				 		ws.send(JSON.stringify({"verb":"finish", "status":party.status, "user":userData, "team":party.team}));
				 	}

				 	return setMessage('GG, You have Won.');
				 }
				 else if(event.data === 'LOSE'){
				 	setBetProgress('lose');

				 	if(party.status === 'creator'){
				 		api.post('/api/match/',{
					 		placedBet:placedBet,
					 		game:currentGame,
					 		mode:mode,
					 		players:lobbyPlayers,
					 		result:'B',
					 		timestamp:event.timestamp
					 	}).then(res=>console.log('saved')).catch(err=>console.log(err))
				 		
				 		ws.send(JSON.stringify({"verb":"finish", "status":party.status, "user":userData, "team":party.team}));
				 	}

				 	return setMessage('You have Lost. HARD LUCK next game :)');
				 }
				 else if(event.data === 'CANCEL_GAME'){
				 	setBetProgress('canceled');
				 	return setMessage('There has been an Error while creating your game, therefore the current match has been declined')
				 }
				 else if(event.data === 'SUS'){
				 	setBetProgress('suspicious');
				 	return setMessage('A suspicious behaviors has been detected, Game Aborted.')
				 }else{
				 	setBetProgress('init');
				 	return setMessage(event.data)
				 }
			}
			client.onerror = (data) =>{
				if(data.type === 'error'){
					setMessage('Our system cannot detect our desktop program');
					setBetProgress('canceled')
					return setTimeout(()=>{setStatus(false)},2000)
				}
			}
	 	}else if(status){
	 		return client.close();
	 	} 
	 	else {
	 		console.log('your are already in game')
	 		return 1
	 	}
	 }

	 const startGame = () =>{
	 	if(mode !== null && mode !== 'Select mode'){
	 		if(party.status === 'invited'){
		 		ws.send(JSON.stringify({"verb":"update", "status":party.status, "user":userData, "team":party.team}));
		 		setStatus(true);
		 		setBetProgress('init')
		 		setMessage('Waiting for the owner to launch...');
		 	} 

		 	if(party.status === 'creator'){
		 		ws.send(JSON.stringify({"verb":"start", "status":party.status, "user":userData, "team":party.team}));
		 		startBet();
		 	}
		 	
	 		return 1
	 	} else {
	 		setStatus(true);
	 		setBetProgress('canceled')
	 		setMessage('Select a mode first')

	 		setTimeout(()=>{setStatus(false)}, 1500)
	 	}
	 }

	 const leaveGame = ()=>{

	 	localStorage.removeItem("partystatus")
	 	navigate('/');
	 	ws.send(JSON.stringify({"verb":"close", "status":party.status, "user":userData, "team":party.team}));
	 	ws.close();
	 }

	return (
		<>
			{loading && <Loading/>}
			{!loading && <section className="bet_page app-flex-wrap">
				{status && 
							<div className="friends_list app-flex-wrap">
								<div className="friends-header app-flex-wrap">
									<MdOutlineClose className="pointer" onClick={()=>setStatus(false)}/>
								</div>
								<div className="container msg-container full app-flex-wrap">
									{betProgress === 'init' && <AiOutlineLoading3Quarters className="loading-icon"/>}
									{betProgress === 'win' && <MdDoneAll className="progress-icon" style={{color:'var(--blue-color)'}}/>}
									{betProgress === 'lose' && <HiOutlineEmojiSad className="progress-icon" style={{color:'var(--red-color)'}}/>}
									{(betProgress === 'suspecious' || betProgress === 'canceled') && <BiErrorAlt className="progress-icon" style={{color:'var(--red-color)'}}/>}
									
									{betProgress === 'win' || betProgress === 'lose'
									 ?	<>
									 	{betProgress === 'win' && <p>{message} <b style={{color:'var(--green-color)'}}>(+ {placedBet} AP)</b></p>}
										{betProgress === 'lose' && <p>{message} <b style={{color:'var(--red-color)'}}>(- {placedBet} AP)</b></p>}
										</>
									 : <p>{message}</p>
										}
								</div>
							</div>}
			
			<div className="main_container app-flex">
				
				{gamesData.map((game, i)=>(
					game.name === currentGame
						 && 
						 <div className='game' key={i}>
						 	<img src={game.icon} alt="game-walpaper" className="game-walp"/>
						 	<div className="overlay"></div>
						 	<h3 className="name">{game.name}</h3>
						</div>
					))}
				
				<div className="game_sets app-flex-wrap">
					{party.status === 'creator' && 
								<>
									<div className="app-flex select_container">
											<h4 className="def">Select Game : </h4>
											<select className="selector" onChange={(e)=>setCurrentGame(e.target.value)}>	
												
												{gamesData.map((game, i)=>(
													<option key={i}>{game.name}</option>
															))}
					
											</select>
										</div>
										<div className="app-flex select_container">
											<h4 className="def">Game Mode : </h4>
											<select className="selector" onChange={(e)=>setMode(e.target.value)}>	
												 <option>Select mode</option>
												 {gamesData.map((game)=>(
												 	 game.name === currentGame 
												 	 	&& game.modes.map((mode, i)=>(
												 	 		<option key={i}>{mode}</option>
												 	 		))
												 	))}
												
											</select>
										</div>
										
										<div className="amount select_container">
											<div className="app-flex select_container">
												<h4 className="def">Placed Bet : </h4>
												<span className="input selector app-flex">	
													<h5>SP</h5>
													<input type="number" className="bet" value={placedBet} onChange={(e)=> controlPlacedBet(e)}/>
												</span>
											</div>
											<span className="warn app-flex">
												<BsFillCircleFill className="warn-icon" />
												<h6 className="warn-text">The bet should be equal for both parties, any bet differences will cause an abort for the current bet, GL HF :D!</h6>
											</span>
										</div>
								</>}
					{party.status === 'invited' && 
								<>
								 	<div className="app-flex select_container">
											<h4 className="def">Select Game : </h4>
											<select className="selector" onChange={(e)=>setCurrentGame(e.target.value)}>	
												
												{gamesData.map((game, i)=>(
													<option key={i}>{game.name}</option>
															))}
					
											</select>
										</div>
										<div className="app-flex select_container">
											<h4 className="def">Game Mode : </h4>
											<select className="selector" onChange={(e)=>setMode(e.target.value)}>	
												 <option>Select mode</option>
												 {gamesData.map((game)=>(
												 	 game.name === currentGame 
												 	 	&& game.modes.map((mode, i)=>(
												 	 		<option key={i}>{mode}</option>
												 	 		))
												 	))}
												
											</select>
										</div>
										
										<div className="amount select_container">
											<div className="app-flex select_container">
												<h4 className="def">Placed Bet : </h4>
												<span className="input selector app-flex">	
													<h5>SP</h5>
													<input type="number" className="bet" value={placedBet} onChange={(e)=> controlPlacedBet(e)}/>
												</span>
											</div>
											<span className="warn app-flex">
												<BsFillCircleFill className="warn-icon" />
												<h6 className="warn-text">The bet should be equal for both parties, any bet differences will cause an abort for the current bet, GL HF :D!</h6>
											</span>
										</div>
								</>}

					<div className="players select_container app-flex">
						<h4 className="def">Players : </h4>
						<div className="players-table selector app-flex-wrap">
							<div className="app-flex table-key">
								<h6 style={{marginRight:'auto'}}>Player</h6>
								<h6>Status</h6>
								<h6 style={{marginLeft:'auto'}}>Bet</h6>
							</div>

							<div className="crossing-bar adj"></div>

							<div className="players-container app-flex-wrap">
								{party.team === 'A' && 
									<span className="player app-flex" style={{backgroundColor:'var(--primary-color)'}}>
										<img src={userData.profile_picture} alt="player-pp" className="player-pp pointer"/>
										<h6 style={{marginRight:'auto'}} className="pointer">You</h6>
										<h6 className="status">Ready</h6>
										<h6 style={{marginLeft:'auto'}}>SP {placedBet}</h6>
									</span>}

								{lobbyPlayers?.map((player,i)=>(
										player.id !== userData.main_id && player.team === 'A' &&
											<span className="player app-flex" style={{backgroundColor:'var(--primary-color)'}} key={i}>
												<img src={player.profile_picture} alt="player-pp" className="player-pp pointer"/>
												<h6 style={{marginRight:'auto'}} className="pointer">{player.username}</h6>
												<h6 className="status">{player.state}</h6>
												<h6 style={{marginLeft:'auto'}}>SP {placedBet}</h6>
											</span>
									))}

								<span className="player pointer app-flex" style={{backgroundColor:'var(--primary-color)'}} onClick={()=>setShowFriends({status:true,team:'A'})}>
									<IoIosAddCircle className="add-icon"/>
									<h5>Add Player to Team A</h5>
								</span>
							</div>
							<div className="players-container app-flex-wrap">
								{lobbyPlayers.length > 1
									? lobbyPlayers?.map((player,i)=>(
										 player.team === 'B' &&
											<span className="player app-flex" style={{backgroundColor:'var(--primary-color)'}} key={i}>
												<img src={player.profile_picture} alt="player-pp" className="player-pp pointer"/>
												<h6 style={{marginRight:'auto'}} className="pointer">{player.id === userData.main_id && player.team === 'B' ? 'You' : player.username}</h6>
												<h6 className="status">{player.state}</h6>
												<h6 style={{marginLeft:'auto'}}>SP {placedBet}</h6>
											</span>
									)) 
									: <span className="player app-flex" style={{backgroundColor:'var(--primary-color)'}}>
											<h6>No players in team B</h6>
										</span>}

								<span className="player pointer app-flex" style={{backgroundColor:'var(--primary-color)'}} onClick={()=>setShowFriends({status:true,team:'B'})}>
									<IoIosAddCircle className="add-icon"/>
									<h5>Add Player to Team B</h5>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="btns app-flex">
				<button className="main-btn" onClick={()=>startGame()}>
					{party?.status === 'creator' ? 'Start Game' : 'Ready'}
				</button>
				<button className="sub-btn" onClick={()=>leaveGame()}>
					{party?.status === 'creator' ? 'Cancel' : 'Leave'}
				</button>
			</div>
		</section>}
		</>
	)
}

export default Challenge;
