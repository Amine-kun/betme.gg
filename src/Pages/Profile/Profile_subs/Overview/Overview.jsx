
import React, {useState, useEffect} from 'react';
import './Overview.scss';
import useAxios from '../../../utils/useAxios';

import {RiArrowUpSLine,RiArrowDownSLine} from 'react-icons/ri';
import {GiTrophy} from 'react-icons/gi';

import GamesTable, {GameState} from '../../../../Components/GamesTable/GamesTable';
import Achievements from '../../../../Components/Achievements/Achievements';
import Statistics from '../../../../Components/Statistics/Statistics';

const Overview = (getParty) => {

		const api = useAxios();

		const [showMore, setShowMore] = useState(false);
		const [playerHistory, setPlayerHistory] = useState([])

		useEffect(() => {
			api.get('/api/match/')
				.then(res=>setPlayerHistory(res.data.data))
				.catch(err=>console.log('cannot get player match history'))
		}, [])

	return (
		<section className="overview app-flex">
             <div className='main-side app-flex-wrap'>
				<div className="dashboard  app-flex">

					<div className="balance palet app-flex-wrap">
						<div className="section__header">
							<h4>Arcadia Points</h4>
						</div>
						<div className="total">
							<h1>0 AP</h1>
						</div>
						<div className="summary app-flex">
							<span className="up app-flex" style={{gap:'3px'}}>
								<RiArrowUpSLine style={{color:'var(--green-color)', fontSize:'1.2rem'}}/>
								<h6>0 AP</h6>
							</span>
							<span className="down app-flex" style={{gap:'3px'}}>
								<RiArrowDownSLine style={{color:'var(--red-color)', fontSize:'1.2rem'}}/>
								<h6>0 AP</h6>
							</span>
						</div>
					</div>
					<div className="trophies palet app-flex-wrap">
						<div className="section__header">
							<h4>Trophies</h4>
						</div>
						<div className="t-detail app-flex">
							<div className="t-total">
								<h1 style={{fontSize:'2rem'}}>0</h1>
								<GiTrophy className="main-tr"/>
							</div>
							
							<div className="t-details app-flex-wrap">
								<h5>Unique Trophies : <span style={{color:'yellow'}}>0</span> </h5>
								<h5>Special Trophies : <span style={{color:'yellow'}}>0</span> </h5>
								<h5>Rare trophies : <span style={{color:'yellow'}}>0</span> </h5>
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
							{playerHistory.length >0 
								? <>
									{[1,2,3,4,5,6,7].map((game, i)=>
									 i < 4 && (i === 0 || i % 2 === 0 
														? <GameState bg={'var(--primary-color-layer3)'} key={i}getParty={getParty}  game={game}/>
														: <GameState key={i} getParty={getParty} game={game}/>) 
								)}
								{showMore && [1,2,3,4,5,6,7].map((game, i)=>
										i > 4 && (i % 2 !== 0 
															? <GameState bg={'var(--primary-color-layer3)'} key={i} getParty={getParty} game={game}/>
															: <GameState key={i} getParty={getParty} game={game}/>) 
	 
									)}
								  </>
								: <span className="full app-flex"><h5>You have no games to show.</h5></span>	}
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

					<Statistics/>

				</div>

				<div className="achievements">
					<div className="section__header">
							<h4>Achievements</h4>
					</div>

					<Achievements/>

				</div>
			 </div>
		</section>
	)
}

export default Overview;