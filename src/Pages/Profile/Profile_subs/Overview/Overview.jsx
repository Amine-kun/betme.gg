
import React, {useState, useEffect} from 'react';
import './Overview.scss';
import useAxios from '../../../../utils/useAxios';

import {RiArrowUpSLine,RiArrowDownSLine} from 'react-icons/ri';
import {GiTrophy} from 'react-icons/gi';

import GamesTable, {GameState} from '../../../../Components/GamesTable/GamesTable';
import Achievements from '../../../../Components/Achievements/Achievements';
import Statistics from '../../../../Components/Statistics/Statistics';

const Overview = ({path, userData}) => {

		const api = useAxios();

		const [showMore, setShowMore] = useState(false);
		const [ttlPoints, setTtlPoints] = useState(0);
		const [wons, setWons] = useState(0);
		const [losts, setLosts] = useState(0);
		const [playerHistory, setPlayerHistory] = useState([])

		useEffect(() => {
			api.get(`/api/match?uid=${path}`)
				.then(res=>{
					let data= res.data.data;
					let wins=0;
					let loses=0;
					setPlayerHistory(data);

					for(let i=0; i<data.length; i++){
						for(let j=0; j<data[i].players.length; j++){
							if(data[i].players[j].id === parseInt(path)){
								if(data[i].players[j].team === data[i].result){
									wins = wins + data[i].placedBet;

								} else{
									loses = loses + data[i].placedBet;
								}
							} 
						}
					}
					setWons(wins);
					setLosts(loses);
				})
				.catch(err=>console.log('cannot get player match history'))

			api.get('/api/player_points/')
				.then((res)=>setTtlPoints(res.data.data))
				.catch(()=>console.log('cannot get your'))
		}, [])

	return (
		<section className="overview app-flex">
             <div className='main-side app-flex-wrap'>
				<div className="dashboard  app-flex">

					<div className="balance palet app-flex-wrap">
						<div className="section__header">
							<h4>Squid Points</h4>
						</div>
						<div className="total">
							<h1>{wons-losts} AP</h1>
						</div>
						<div className="summary app-flex">
							<span className="up app-flex" style={{gap:'3px'}}>
								<RiArrowUpSLine style={{color:'var(--green-color)', fontSize:'1.2rem'}}/>
								<h6>{wons} AP</h6>
							</span>
							<span className="down app-flex" style={{gap:'3px'}}>
								<RiArrowDownSLine style={{color:'var(--red-color)', fontSize:'1.2rem'}}/>
								<h6>{losts} AP</h6>
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
							{playerHistory !== 'none' && playerHistory.length >0 
								? <>
									{playerHistory.map((game, i)=>
									 i < 4 && (i === 0 || i % 2 === 0 
														? <GameState bg={'var(--primary-color-layer3)'} key={i}  game={game} isFinished={true}/>
														: <GameState key={i} game={game} isFinished={true}/>) 
								)}
								{showMore && playerHistory.map((game, i)=>
										i > 4 && (i % 2 !== 0 
															? <GameState bg={'var(--primary-color-layer3)'} key={i} game={game} isFinished={true}/>
															: <GameState key={i} game={game} isFinished={true}/>) 
	 
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