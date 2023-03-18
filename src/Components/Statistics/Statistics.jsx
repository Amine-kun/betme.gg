import React, {useState, useEffect} from 'react';
import './Statistics.scss';
import {files} from	'../../Assets';
import {useSelector} from 'react-redux';

const mockData = [{gameName:'Apex', gameIcon:files.Apex, totalGames:'20', winrate:'45'},
				  {gameName:'LOL', gameIcon:files.League, totalGames:'30', winrate:'78'},
				  {gameName:'R6S', gameIcon:files.Rainbow, totalGames:'40', winrate:'69'},
				  {gameName:'CSGO', gameIcon:files.Csgo, totalGames:'10', winrate:'90'}];

const Statistics = ({history, path}) => {

	const games = useSelector(state=>state.games.games)
	const [kda, setKda] = useState({wins:0, loses:0, winrate:0})
	const [stats, setStats] = useState([])

	const calculateWR = (data) =>{
		if(data.length > 0){
			let wins = 0;
			let loses = 0;
			for(let i=0; i<data.length; i++){
							for(let j=0; j<data[i].players.length; j++){
								if(data[i].players[j].id === parseInt(path)){
									if(data[i].players[j].team === data[i].result){
										wins++

									} else{
										loses++
									}
								} 
							}
						}
			return {wins:wins, loses:loses, winrate:(wins/(wins+loses))*100};
		}
	}

	const labelGames = ()=>{
		let labeledGames = [];

		for (let j = 0; j < games.length; j++){
			labeledGames.push({game:games[j].id, games:[], stats:{}, icon:games[j].icon})
		}

		for(let i = 0; i < history.length; i++){
			for (let x = 0; x < labeledGames.length; x++){
				if(history[i].game_info === labeledGames[x].game){
					labeledGames[x].games.push(history[i]);
				}
			}
		}

		for (let l=0; l < labeledGames.length; l++){
			if(labeledGames[l].games.length > 0){
				let calculate= calculateWR(labeledGames[l].games)
				labeledGames[l].stats = calculate;
			}
		}
		setStats(labeledGames);
	}

	useEffect(() => {
		let calcualting = calculateWR(history);
		setKda(calcualting);
		labelGames();
	}, [history])
	return (
		<div className="box app-flex-wrap">
						<div className="percent">
							<svg >
								<circle className="circle" cx="60" cy="60" r="60"></circle>
								<circle className="circle" cx="60" cy="60" r="60" style={{strokeDashoffset:`calc(438 - (3.8 * ${kda?.winrate} ))`}}></circle>
								<circle className="circle" cx="45" cy="45" r="45"></circle>
								<circle className="circle" cx="45" cy="45" r="45" style={{strokeDashoffset:`calc(438 - (3.8 * ${kda?.winrate} ))`}}></circle>
							</svg>
							
							<div className="totalGames">
								<h4 style={{opacity:'0.9'}}>GAMES</h4>
								<h5>{kda?.loses + kda?.wins}</h5>
							</div>
						</div>

						<div className="app-flex games-sum">
							<span className="brief">
								<h5 style={{opacity:'0.9'}}>WINS</h5>
								<h5>{kda?.wins}</h5>
								<div className="circle" style={{backgroundColor:'var(--green-color)'}}></div>
							</span>
							<span className="brief">
								<h5 style={{opacity:'0.9'}}>LOSES</h5>
								<h5>{kda?.loses}</h5>
								<div className="circle" ></div>
							</span>
							<span className="brief">
								<h5 style={{opacity:'0.9'}}>WINRATE</h5>
								<h5>{kda?.winrate}%</h5>
								<div className="circle" style={{backgroundColor:'var(--blue-color)'}}></div>
							</span>
						</div>

						<span className="bar" style={{cursor:'default'}}></span>

						<div className="app-flex table-key">
							<h6>Game</h6>
							<h6>Total</h6>
							<h6>Winrate</h6>
						</div>

						<div className="games-stats app-flex-wrap">

							{stats?.map((state, i)=>(
								state.games.length > 0 &&
									<div className={`game-stats app-flex ${(i === 0 || i % 2 === 0) && 'bg-sub'}`} key={state.id}>
										<img src={state.icon} alt="game" className="stats-icon"/>
										<h5 className="total">{state.stats.wins + state.stats.loses}</h5>
										<h5 className="wr">{state.stats.winrate}%</h5>
									</div>
								))}

						</div>
					</div>
	)
}

export default Statistics