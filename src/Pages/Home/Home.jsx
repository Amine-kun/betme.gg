import React, {useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './Home.scss';
import {IoMdArrowDropdown} from 'react-icons/io';

import Carousel, {CarouselItem} from '../../Components/Carousel2/Carousel2';
import GamesTable, {GameState} from '../../Components/GamesTable/GamesTable';
import {files} from '../../Assets';

const games = [{name:'League of Legends', icon:files.League},
			   {name:'Apex Legends', icon:files.Apex},
			   {name:'Fortnite', icon:files.fortnite},
			   {name:'Rainbow Six Siege', icon:files.Rainbow},
			   {name:'CS:GO', icon:files.Csgo},
			   {name:'League of Legends', icon:files.League},
			   {name:'League of Legends', icon:files.League},
			   {name:'League of Legends', icon:files.League},
			   {name:'League of Legends', icon:files.League}];

const Home = () => {

	const navigate = useNavigate();
	const [moreGames, setMoreGames] = useState(false);
	const [tableNav, setTableNav] = useState('1V1 GAMES');
	const [showTab, setShowTab] = useState(false);
	const [showMore, setShowMore] = useState(false);

	return (
		<section className="home app-flex-wrap">
			<div className="app-flex heads">
				<Carousel>
					<CarouselItem><img src={files.raven} className="slide" alt="pannel"/></CarouselItem>
					<CarouselItem><img src={files.yasuo} className="slide" alt="pannel2"/></CarouselItem>
					<CarouselItem><img src={files.jhin} className="slide" alt="pannel3"/></CarouselItem>
				</Carousel>
				<div className="sideDivs app-flex-wrap">
					<div className="state">
					 	 <img src={files.trophy} alt="balance" className="trophy"/>
						 <div className="details">
							<h5>Trophies Earned:</h5>
							<h2>12</h2>
						</div>
					</div>
					<div className="state">
						<img src={files.balance} alt="balance" className="balance"/>
						<div className="details">
							<h5>Your Balance:</h5>
							<h2>$1080</h2>
						</div>
					</div>
				</div>
			</div>
			
			<div className="games app-flex-wrap">

				<h3 style={{alignSelf:'flex-start'}}>Featured Games</h3>
				<div className="games_container app-flex">
					{games.map((game, i)=>{
						 return i <= 5 &&
								<div className="game app-flex" key={i} onClick={()=>navigate(`/Games/${game.name}`)}>
									<img src={game.icon} alt="game" className="game-icon"/>
									<p className="p-text">{game.name}</p>
								</div>
						} )}
					{moreGames && 
						games.map((game, i)=>{
							 return i > 5 &&
									<div className="game app-flex" key={i} onClick={()=>navigate(`/Games/${game.name}`)}>
										<img src={game.icon} alt="game" className="game-icon"/>
										<p className="p-text">{game.name}</p>
									</div>
							} )
						}
				</div>
				<span className="bar pointer" onClick={()=>setMoreGames(!moreGames)}></span>
				<h5 style={{marginTop:'-10px'}}>{!moreGames ? 'Show more!' : 'Show less!'}</h5>

			</div>
			
			<div className="app-flex-wrap live-games">
				<h3 style={{alignSelf:'flex-start'}}>Live Games</h3>
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

export default Home;