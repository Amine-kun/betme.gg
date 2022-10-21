import React, {useState} from 'react';
import './GameOptions.scss';

import {files} from '../../Assets';
import GamesTable, {GameState} from '../../Components/GamesTable/GamesTable';
import Statistics from '../../Components/Statistics/Statistics';

import {IoMdArrowDropdown} from 'react-icons/io';
import {MdAddBox} from 'react-icons/md'

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
			</div>
			
			<div className="game-info app-flex">
				<button className="main-btn">
					Start A Bet
				</button>
				<p style={{opacity:'0.7'}}>Last PLayed : <span className="highlight">2 Jun</span></p>
				
				<span className="add-btn main-btn app-flex">
					<h5>Add to Library</h5>
					<MdAddBox className="add-icon"/>
				</span>
			</div>

			<span className="crossing-bar"></span>

			<div className="main-content app-flex">
				<div className="app-flex-wrap live-games">
						 <div className="header">
									<h4>Live Games</h4>
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
					<div className="game-statistics app-flex-wrap">
						<div className="header">
									<h4>Game Statistics</h4>
					     </div>
							<Statistics/>
					</div>
			</div>
					
		</section>
	)
}

export default GameOptions;