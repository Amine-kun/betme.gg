import React, {useState} from 'react';
import './GameOptions.scss';

import {files} from '../../Assets';
import GamesTable, {GameState} from '../../Components/GamesTable/GamesTable';
import {IoMdArrowDropdown} from 'react-icons/io';
import {MdAddBox} from 'react-icons/md';

const data = [{month:'Last 24Hours', avg:'1150', peak:'2463'},
			  {month:'Last Week', avg:'1150', peak:'2463'},
			  {month:'Last Month', avg:'1150', peak:'2463'},
			  {month:'Last 3 Months', avg:'1150', peak:'2463'},
			  {month:'Last Year', avg:'1150', peak:'2463'}];

const GameOptions = () => {

		const [showMore, setShowMore] = useState(false);
		const [tableNav, setTableNav] = useState('1V1 GAMES');
	    const [showTab, setShowTab] = useState(false);

	return (
		<section className="main_gameoptions app-flex-wrap">
			<div className="game_header">
				<img alt="game_wallpaper" src={files.lol} className="game-wallpaper"/>
					<span className="game-sum app-flex">
						<img alt="game-icon" src={files.League} className="game-icon"/>
						<h3 className="game-name">League Of Lengends</h3>
					</span>
				<MdAddBox className="add-icon"/>
			</div>
			
			<div className="game-info app-flex">
				<div  className="about-game">	
					<p>
					 	League of Legends is one of the world's most popular
					 	 video games, developed by Riot Games. 
					 	 It features a team-based competitive game 
					 	 mode based on strategy and outplaying opponents.
					 	  Players work with their team to break the enemy 
					 	  Nexus before the enemy team breaks theirs.
					</p>
				</div>
				<div className="game-stats app-flex">
					<table className="styled-table">
						<thead className="title">
						        <tr>
						            <th>Total games</th>
						            <th></th>
						            <th></th>
						        </tr>
					    </thead>
					    <thead>
					        <tr>
					            <th>Month</th>
					            <th>Average</th>
					            <th>Peak</th>
					        </tr>
					    </thead>
					    <tbody>
					        {data.map((datum, i)=>(
							         <tr key={i}>
							            <td className="period">{datum.month}</td>
							            <td>{datum.avg}</td>
							            <td>{datum.peak}</td>
							         </tr>
					        	))}
					    </tbody>
					</table>
				</div>
			</div>
					<div className="app-flex-wrap live-games">
						 <div className="header">
									<h4>League Of Legends Live Games</h4>
					     </div>
						<div className="games-table app-flex-wrap">
							<div className="table-header app-flex">
								<h5 className={`table-nav ${tableNav === '1V1 GAMES' && 'active-nav'}`} onClick={()=>{setTableNav('1V1 GAMES'); setShowTab(!showTab);}}>1V1 GAMES</h5>
								<h5 className={`table-nav ${tableNav === '5V5 GAMES' && 'active-nav'}`} onClick={()=>{setTableNav('5V5 GAMES'); setShowTab(!showTab);}}>5V5 GAMES</h5>
								<h5 className={`table-nav ${tableNav === 'TOURNEMENTS' && 'active-nav'}`} onClick={()=>{setTableNav('TOURNEMENTS'); setShowTab(!showTab);}}>TOURNEMENTS</h5>
								<h5 className={`table-nav ${tableNav === 'CUSTOM GAMES' && 'active-nav'}`} onClick={()=>{setTableNav('CUSTOM GAMES'); setShowTab(!showTab);}}>CUSTOM GAMES</h5>
							</div>
							<div className="onPhone-table-header table-header">
								<span className="app-flex table-nav active-nav" onClick={()=> setShowTab(!showTab)}>
									<h5>{tableNav}</h5>
									<IoMdArrowDropdown className={!showTab ? 'drop-arrow' : 'icon'}/>
								</span>
								<div className={`hidden-tab ${showTab && 'show'}`}>
									<h5 className={`table-nav ${tableNav === '1V1 GAMES' && 'active-nav'}`} onClick={()=>{setTableNav('1V1 GAMES'); setShowTab(!showTab);}}>1V1 GAMES</h5>
									<h5 className={`table-nav ${tableNav === '5V5 GAMES' && 'active-nav'}`} onClick={()=>{setTableNav('5V5 GAMES'); setShowTab(!showTab);}}>5V5 GAMES</h5>
									<h5 className={`table-nav ${tableNav === 'TOURNEMENTS' && 'active-nav'}`} onClick={()=>{setTableNav('TOURNEMENTS'); setShowTab(!showTab);}}>TOURNEMENTS</h5>
									<h5 className={`table-nav ${tableNav === 'CUSTOM GAMES' && 'active-nav'}`} onClick={()=>{setTableNav('CUSTOM GAMES'); setShowTab(!showTab);}}>CUSTOM GAMES</h5>
								</div>
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
					</div>
		</section>
	)
}

export default GameOptions;