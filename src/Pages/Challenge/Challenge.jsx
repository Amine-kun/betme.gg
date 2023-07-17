import React, {useState, useEffect} from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import './Challenge.scss';
import {useNavigate} from 'react-router-dom';
import useAxios from '../../utils/useAxios';
import {useSelector} from 'react-redux';

import Loading from '../../Components/Loading/Loading';
import {files} from '../../Assets';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import {BiErrorAlt} from 'react-icons/bi';
import {BsFillCircleFill} from 'react-icons/bs';
import {IoIosAddCircle, IoIosRemove, IoIosAdd} from 'react-icons/io';
import {MdOutlineClose, MdDoneAll} from 'react-icons/md';
import {HiOutlineEmojiSad} from 'react-icons/hi';



const Challenge = ({updateData, setShowFriends, e, userData, getParty, lobbyPlayers, ws, gameStatus, setGameStatus}) => {

	 const [currentGame, setCurrentGame] = useState(updateData.game);
	 const [gameId, setGameId] = useState(updateData.id)
	 const [mode, setMode] = useState(updateData.mode);
	 const [placedBet, setPlacedBet] = useState(updateData.bet);
	 const [status, setStatus] = useState(false);
	 const [isOpen, setIsOpen] = useState(false);

	 const [message, setMessage] = useState('start a bet ...');
	 const [loading, setLoading] = useState(true);
	 const [party, setParty] = useState(null);
	 const [betProgress, setBetProgress] = useState('init');

	 const api = useAxios();
	 const navigate = useNavigate();
	 const games = useSelector(state=>state.games.games)


	 const clearStatus = () =>{
	 	setStatus(false);
	 	setGameStatus(null)
	 }

	 const leaveGame = ()=>{

	 	localStorage.removeItem("partystatus")
	 	navigate('/');
	 	clearStatus();
	 	ws.send(JSON.stringify({"verb":"close", "status":party.status, "user":userData, "team":party.team, "data":"leave"}));
	 	ws.close();
	 }


	 useEffect(() => {
	 	let getP= getParty();
	 	setParty(getP);
	 	setLoading(false);
	 }, [])

	 useEffect(()=>{
	 	setCurrentGame(updateData.game);
	 	setMode(updateData.mode);
	 	setPlacedBet(updateData.bet);
	 },[updateData])

	 useEffect(()=>{
	 	if(gameStatus === 'start'){
			 		startBet();
	 	}
	 }, [gameStatus])

	 const setSettings=()=>{
	 	if(ws !== null && party !== null){
	 		const data = {id:gameId, currentGame:currentGame, mode:mode, placedBet:placedBet}
			ws.send(JSON.stringify({"verb":"mode", "user":userData, "team":party?.team, "data":data}))

	 	}
	 }

	 const checkPLayersValidity = async () =>{
	 	const res = await api.post(`api/validation/`,{
	 		gameId : party.id,
	 		placedBet : placedBet
	 	});
	 	return res.data;
	 }

	 const startBet = ()=>{
	 	
	 	if(!isOpen){
	 		setStatus(true);

	 		setBetProgress('init');
	 		setMessage('start a bet ...');

	 		var client = new W3CWebSocket(`ws://localhost:${currentGame === 'Valorant' ? '8081' : '8080'}/?user=${userData.username}&game=${party?.id}&players=${parseInt(mode[0])+parseInt(mode[2])}`);

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
					 		game_info:gameId,
					 		mode:mode,
					 		players:lobbyPlayers,
					 		result:'A',
					 		timestamp:15
					 	}).then(res=>console.log('saved')).catch(err=>console.log(err))
				 		
				 		ws.send(JSON.stringify({"verb":"finish", "status":party.status, "user":userData, "team":party.team, "data":"end"}));
				 		setMessage('GG, You have Won.');
				 		setTimeout(()=>{leaveGame()}, 1500);
				 	}

				 	return true
				 }
				 else if(event.data === 'LOSE'){
				 	setBetProgress('lose');

				 	if(party.status === 'creator'){
				 		api.post('/api/match/',{
					 		placedBet:placedBet,
					 		game:currentGame,
					 		game_info:gameId,
					 		mode:mode,
					 		players:lobbyPlayers,
					 		result:'B',
					 		timestamp:event.timestamp
					 	}).then(res=>console.log('saved')).catch(err=>console.log(err))
				 		
				 		ws.send(JSON.stringify({"verb":"finish", "status":party.status, "user":userData, "team":party.team, "data":"end"}));
				 		setMessage('You have Lost. HARD LUCK next game :)');
				 		setTimeout(()=>{leaveGame()}, 1500);
				 	}

				 	return true
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
				console.log('error', data)
				if(data.type === 'error'){
					setMessage('Our system cannot detect our desktop program');
					setBetProgress('canceled')
					return setTimeout(()=>{setStatus(false)},2000)
				}
			}
	 	}else if(isOpen){
	 		return client.close();
	 	} 
	 	else {
	 		console.log('your are already in game')
	 		return 1
	 	}
	 }

	 const startGame = async () =>{
	 	
	 	if(mode !== null && mode !== 'Select mode'){
	 		if(party.status === 'invited'){
		 		ws.send(JSON.stringify({"verb":"update", "status":party.status, "user":userData, "team":party.team, "data":"update"}));
		 		setStatus(true);
		 		setBetProgress('init')
		 		setMessage('Waiting for the owner to launch...');
		 	} 

		 	if(party.status === 'creator'){
		 		setStatus(true);
		 		setBetProgress('init');
		 		setMessage('Validating players');

		 		let validate = await checkPLayersValidity();

		 		if(validate.status === 'refuse'){
			 		setBetProgress('canceled');
			 		setMessage(validate.reason);

		 		}else{
		 			let targetGame = games.filter(game=>{
		 				return game.game === currentGame
		 			})
		 			setGameId(targetGame[0].id)
		 			ws.send(JSON.stringify({"verb":"start", "status":party.status, "user":userData, "team":party.team, "data":"start", "game":targetGame[0].id}));
		 			startBet();
		 		}
		 	}
		 	
	 		return 1
	 	} else {
	 		setStatus(true);
	 		setBetProgress('canceled')
	 		setMessage('Select a mode first')

	 		setTimeout(()=>{setStatus(false)}, 1500)
	 	}
	 }

	 

	return (
		<>
			{loading && <Loading/>}
			{!loading && <section className="bet_page app-flex-wrap">
				{status && 
							<div className="friends_list app-flex-wrap">
								<div className="friends-header app-flex-wrap">
									<MdOutlineClose className="pointer" onClick={()=>clearStatus()}/>
								</div>
								<div className="container msg-container full app-flex-wrap" style={{width:'550px'}}>
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
				
				{games.map((game, i)=>(
					game.game === currentGame
						 && 
						 <div className='game' key={i}>
						 	<img src={game.bg} alt="game-walpaper" className="game-walp"/>
						 	<div className="overlay"></div>
						 	<h3 className="name">{game.game}</h3>
						</div>
					))}
				
				<div className="game_sets app-flex-wrap">
					{party.status === 'creator' && 
								<>
									<div className="app-flex select_container">
											<h4 className="def">Select Game : </h4>
											<select className="selector" onChange={(e)=>setCurrentGame(e.target.value)}>	
												
												{games.map((game, i)=>(
													<option key={i} onClick={()=>setGameId(game.id)}>{game.game}</option>
															))}
					
											</select>
										</div>
										<div className="app-flex select_container">
											<h4 className="def">Game Mode : </h4>
											<select className="selector" onChange={(e)=>setMode(e.target.value)}>	
												 <option>Select mode</option>
												 {games.map((game)=>(
												 	 game.game === currentGame 
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
													<span className="full">
														<h5>{placedBet}</h5>
													</span>
													 
													<IoIosRemove className="add-ic" onClick={()=>setPlacedBet(placedBet === 0 ? 0 : placedBet - 5)}/>
													<IoIosAdd className="add-ic" onClick={()=>setPlacedBet(placedBet + 5)}/>
												</span>
											</div>
											<span className="warn app-flex">
												<BsFillCircleFill className="warn-icon" />
												<h6 className="warn-text">Only the party owner is able to change the settings, GG HF ! </h6>
											</span>

											
										</div>
								</>}
					{party.status === 'invited' && 
								<>
								 	<div className="app-flex select_container">
											<h4 className="def">Select Game : </h4>
											<div className="selector">
												<h5>{currentGame}</h5>
											</div>
										</div>
										<div className="app-flex select_container">
											<h4 className="def">Game Mode : </h4>
											<div className="selector">
												<h5>{mode}</h5>
											</div>
										</div>
										
										<div className="amount select_container">
											<div className="app-flex select_container">
												<h4 className="def">Placed Bet : </h4>
												<span className="input selector app-flex">
													
													<h5>SP</h5>
													<span className="full">
														<h5>{placedBet}</h5>
													</span>

													<IoIosRemove className="add-ic" onClick={()=>setPlacedBet(placedBet === 0 ? 0 : placedBet - 5)}/>
													<IoIosAdd className="add-ic" onClick={()=>setPlacedBet(placedBet + 5)}/>	
													
												</span>
											</div>
											<span className="warn app-flex">
												<BsFillCircleFill className="warn-icon" />
												<h6 className="warn-text">Only the party owner is able to change the settings, GG HF ! </h6>
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
								{lobbyPlayers?.length > 1
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
				<button className="main-btn" onClick={()=>setSettings()}>
						Apply settings
				</button>
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
