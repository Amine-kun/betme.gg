
import React, {useState} from 'react';
import './Stats.scss';
import Statistics from '../../../../Components/Statistics/Statistics';
import GamesTable, {GameState} from '../../../../Components/GamesTable/GamesTable';
import {MdArrowDropDown} from 'react-icons/md';

import {files} from '../../../../Assets';

const data = [{name:'League of legends', bg: files.lol, totalGames:'20', wins:'14', loses:'6' ,totalWin:'$120', totalLosed:'$20'},
			  {name:'CS:GO', bg: files.csgoWalp, totalGames:'20', wins:'14', loses:'6' ,totalWin:'$100', totalLosed:'$80'},
			  {name:'PUBG', bg: files.pubg, totalGames:'20', wins:'14', loses:'6' ,totalWin:'$200', totalLosed:'$30'},
			  {name:'Warzone', bg: files.warzone, totalGames:'20', wins:'14', loses:'6' ,totalWin:'$10', totalLosed:'$5'}];

const Stats = () => {

	const [selectedGame, setSelectedGame] = useState(data[0].name);
	const [isOpen, setIsOpen] = useState(false);
	const [showMore, setShowMore] = useState(false);

	return (
		<section className="stats_main">

			<div className="player-stats">
				<div className="section__header">
							<h4>Over all statistics</h4>
				</div>
	             <Statistics/>
			</div>

			<div className="player-games-sum">
				<div className="section__header">
							<h4>Games Played</h4>
				</div>
				<div className="sum-up">
					
					{data.map((game, i)=>(
						<div className={`all-games app-flex ${selectedGame === game.name && 'show'}`} key={i}>
							<div className="game-img">
								<img alt="game-img" className="game" src={game.bg}/>
								<div className="overlay"></div>
							</div>
							<div className="info app-flex-wrap">
								<span className="app-flex drop" onClick={()=>setIsOpen(!isOpen)}>
									<h3 className="pointer">{game.name}</h3>
									<MdArrowDropDown className={`icon`}/>

									<div className={`drop-menu app-flex-wrap ${isOpen && 'active-drop'}`} onClick={(e)=>e.stopPropagation()}>
										{data.map((game)=>(
											<h4 className={`drop-option pointer ${selectedGame === game.name && 'active'}`} 
											key={game.name}
											onClick={()=> {setSelectedGame(game.name); setIsOpen(!isOpen)}}>

												{game.name}
											</h4>
											))}
									</div>
								</span>
								<span className="crossing-bar"></span>
								<div className="game-stats app-flex">
									<span className="app-flex  wrap">
										<h3>Total Games : {game.totalGames}</h3>
									</span>
									<span className="app-flex wrap">	
										<h3>Win rate : {game.wins * 100 / game.totalGames}%</h3>
									</span>
									<span className="app-flex wrap">	
										<h4>Games Won : {game.wins}</h4>
									</span>
									<span className="app-flex wrap">	
										<h4>Games Lost : {game.loses}</h4>
									</span>
									<span className="app-flex wrap">	
										<h4>Balance Adds : + {game.totalWin}</h4>
									</span>
									<span className="app-flex wrap">	
										<h4>Balance Losts : - {game.totalLosed}</h4>
									</span>
								</div>
							</div>
						</div>
						))}

					<div className="crossing-bar" style={{marginBottom:'15px'}}></div>

					<div className="selectedGame-history">
						<GamesTable showMore={showMore} setShowMore={setShowMore}>
							{[1,2,3,4,5,6,7].map((game, i)=>
									 i < 4 && (i === 0 || i % 2 === 0 
														? <GameState bg={'var(--primary-color-layer3)'} key={i} status={"win"} isFinished={true}/>
														: <GameState key={i} status={"lose"} isFinished={true}/>) 
								)}
							{showMore && [1,2,3,4,5,6,7].map((game, i)=>
									i > 4 && (i % 2 !== 0 
														? <GameState bg={'var(--primary-color-layer3)'} key={i} status={"lose"} isFinished={true}/>
														: <GameState key={i} status={"win"} isFinished={true}/>) 
 
								)}
						</GamesTable>
					</div>
				</div>
			</div>
			
		</section>
	)
}

export default Stats;