
import React, {useState} from 'react';
import './Overview.scss';
import GamesTable, {GameState} from '../../../../Components/GamesTable/GamesTable';
import Achievements from '../../../../Components/Achievements/Achievements';
import {files} from	'../../../../Assets';


const mockData = [{gameName:'Apex', gameIcon:files.Apex, totalGames:'20', winrate:'45'},
				  {gameName:'LOL', gameIcon:files.League, totalGames:'30', winrate:'78'},
				  {gameName:'R6S', gameIcon:files.Rainbow, totalGames:'40', winrate:'69'},
				  {gameName:'CSGO', gameIcon:files.Csgo, totalGames:'10', winrate:'90'}];


const Overview = () => {

		const [showMore, setShowMore] = useState(false);

	return (
		<div className="overview app-flex">
             <div className='main-side app-flex-wrap'>
				<div className="dashboard  app-flex">

					<div className="balance palet app-flex-wrap">
						<div className="section__header">
							<h4>Balance</h4>
						</div>
						<div className="total">
							<h1>$1023.00</h1>
						</div>
						<div className="summary app-flex">
							<span className="up">
								<h6>$100.00</h6>
							</span>
							<span className="down">
								<h6>$83.00</h6>
							</span>
						</div>
					</div>
					<div className="trophies palet app-flex-wrap">
						<div className="section__header">
							<h4>Trophies</h4>
						</div>
						<div className="t-detail app-flex">
							<div className="t-total">
								<h1>17</h1>
							</div>
							
							<div className="t-details app-flex-wrap">
								<h5>Unique Trophies: 2</h5>
								<h5>Special Trophies: 1</h5>
								<h5>Rare trophies: 14</h5>
							</div>
						</div>
					</div>
				</div>

				<div className="history app-flex-wrap">
					<div className="section__header">
							<h4>History</h4>
					</div>
					
					<span className="crossing-bar"></span>

					<div className="app-flex table-key">
						<h6 style={{marginRight:'auto'}}>Game</h6>
						<h6>Stats</h6>
						<h6 style={{marginLeft:'auto'}}>Timer</h6>
					</div>
					
					<span className="crossing-bar"></span>

						<GamesTable showMore={showMore} setShowMore={setShowMore}>
							{[1,2,3,4,5,6,7].map((game, i)=>
									 i < 4 && (i === 0 || i % 2 === 0 
														? <GameState bg={'var(--primary-color-layer3)'} key={i}/>
														: <GameState key={i}/>) 
								)}
							{showMore && [1,2,3,4,5,6,7].map((game, i)=>
									i > 4 && (i % 2 !== 0 
														? <GameState bg={'var(--primary-color-layer3)'} key={i}/>
														: <GameState key={i}/>) 
 
								)}
						</GamesTable>
						
				</div>

				<div className="achievements hide">
					<div className="section__header">
							<h4>Achievements</h4>
					</div>

					<Achievements/>

				</div>
			 </div>
				
			 <div className='sub-side app-flex-wrap'>
				<div className="stats">
					<div className="section__header">
							<h4>Stats</h4>
					</div>

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

				</div>

				<div className="achievements">
					<div className="section__header">
							<h4>Achievements</h4>
					</div>

					<Achievements/>

				</div>
			 </div>
		</div>
	)
}

export default Overview;