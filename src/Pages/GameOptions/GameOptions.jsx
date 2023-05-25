import React, {useState, useEffect} from 'react';
import './GameOptions.scss';

import {files} from '../../Assets';
import GamesTable, {GameState} from '../../Components/GamesTable/GamesTable';
import Loading from '../../Components/Loading/Loading'
import Statistics from '../../Components/Statistics/Statistics';
import {useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import useAxios from '../../utils/useAxios';
import {v4 as uuidv4} from 'uuid';

import {IoMdArrowDropdown} from 'react-icons/io';

const GameOptions = ({userData,startListening}) => {

		const games = useSelector(state=>state.games.games)
	    const location = useLocation();
	    const path = location.pathname.split("/")[2];
	    const api = useAxios();
	    const navigate = useNavigate();

		const [showMore, setShowMore] = useState(false);
	    const [loading, setLoading] = useState(true);

	    const [game, setGame] = useState({});
	    const [gameMatchs, setGameMatchs] = useState([]);


	    const checkPartStatus=()=>{
			const PartyStatus = localStorage.getItem("partystatus")
	        ? JSON.parse(localStorage.getItem("partystatus"))
	        : null;
	        
				if(PartyStatus === null){
						let id = uuidv4();
						localStorage.setItem("partystatus", JSON.stringify({status:'creator',team:'A', id:id}));
						startListening();
						navigate(`/Challenge/${id}`);
				}

				navigate(`/Challenge/${PartyStatus.id}`);
		}

	  	
	    useEffect(() => {
	    	const target = games.filter((game)=>{
		    	return game.id === parseInt(path)
		    })

		    setGame(target[0])

		    api.get(`/api/match?uid=${userData.main_id}`)
				.then(res=>{
					let data= res.data.data;

					let filtering = data.filter((match)=>{
						return match.game_info === target[0].id
					})
					setGameMatchs(filtering)
				})
				.catch(err=>console.log('cannot get player match history2'))

			setLoading(false);

	    }, [path])

	return (
		<>
		{game === undefined && loading&& <Loading/>}
		{game !== undefined && !loading&& <section className="main_gameoptions app-flex-wrap">
					<div className="game_header">
						<img alt="game_wallpaper" src={game?.bg} className="game-wallpaper"/>
							<span className="game-sum app-flex">
								<img alt="game-icon" src={game?.icon} className="game-icon"/>
								<h3 className="game-name">{game?.game}</h3>
							</span>
					</div>
					
					<div className="game-info app-flex">
						<button className="main-btn" onClick={()=>checkPartStatus()}>
							Start A Bet
						</button>
						<p style={{opacity:'0.7'}}>Last PLayed : <span className="highlight">2 Jun</span></p>
						
					</div>
		
					<span className="crossing-bar"></span>
		
					<div className="main-content app-flex">
						<div className="app-flex-wrap live-games">
								 <div className="header">
											<h4>Past matchs in this game</h4>
							     </div>
								<div className="games-table app-flex-wrap">
									<span className="crossing-bar"></span>
									{/*<div className="app-flex table-key">
										<h6 style={{marginRight:'auto'}}>Game</h6>
										<h6>Stats</h6>
										<h6 style={{marginLeft:'auto'}}>Timer</h6>
									</div>
									<span className="crossing-bar"></span>*/}
								
										<h4>Coming soon...</h4>
		
								</div>
							</div>
							<div className="game-statistics app-flex-wrap">
								<div className="header">
											<h4>Game Statistics</h4>
							     </div>
									<Statistics history={gameMatchs} path={userData.main_id}/>
							</div>
					</div>
							
				</section>}
			</>
	)
}

export default GameOptions;