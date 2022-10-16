import React from 'react';
import './Statistics.scss';
import {files} from	'../../Assets';

const mockData = [{gameName:'Apex', gameIcon:files.Apex, totalGames:'20', winrate:'45'},
				  {gameName:'LOL', gameIcon:files.League, totalGames:'30', winrate:'78'},
				  {gameName:'R6S', gameIcon:files.Rainbow, totalGames:'40', winrate:'69'},
				  {gameName:'CSGO', gameIcon:files.Csgo, totalGames:'10', winrate:'90'}];

const Statistics = () => {
	return (
		<div className="box app-flex-wrap">
						<div className="percent">
							<svg >
								<circle className="circle" cx="60" cy="60" r="60"></circle>
								<circle className="circle" cx="60" cy="60" r="60"></circle>
								<circle className="circle" cx="45" cy="45" r="45"></circle>
								<circle className="circle" cx="45" cy="45" r="45"></circle>
							</svg>
							
							<div className="totalGames">
								<h4 style={{opacity:'0.9'}}>GAMES</h4>
								<h5>100</h5>
							</div>
						</div>

						<div className="app-flex games-sum">
							<span className="brief">
								<h5 style={{opacity:'0.9'}}>WINS</h5>
								<h5>80</h5>
								<div className="circle" style={{backgroundColor:'var(--green-color)'}}></div>
							</span>
							<span className="brief">
								<h5 style={{opacity:'0.9'}}>LOSES</h5>
								<h5>20</h5>
								<div className="circle" ></div>
							</span>
							<span className="brief">
								<h5 style={{opacity:'0.9'}}>WINRATE</h5>
								<h5>80%</h5>
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

							{mockData.map((game, i)=>(
								<div className={`game-stats app-flex ${(i === 0 || i % 2 === 0) && 'bg-sub'}`} key={i}>
									<img src={game.gameIcon} alt="game" className="stats-icon"/>
									<h5 className="total">{game.totalGames}</h5>
									<h5 className="wr">{game.winrate}%</h5>
								</div>
								))}

						</div>
					</div>
	)
}

export default Statistics