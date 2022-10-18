import React, {useState} from 'react';
import './Challenge.scss';

import {files} from '../../Assets';
import picture from '../../Assets/profile.jpg';
import {BsFillCircleFill} from 'react-icons/bs';
import {IoIosAddCircle} from 'react-icons/io';

const gamesData = [{name:'League of legends', icon:files.lol, modes:['1V1','5V5','2v2 BOTLANE']},
				   {name:'Apex', icon:files.apexWalp, modes:['1V1','TEAM VS TEAM','2v2']},
				   {name:'Streetfighter', icon:files.streetfighter, modes:['1V1', '3V3']},
				   {name:'Valorant', icon:files.valo, modes:['1V1','5V5']}]

const Challenge = (e) => {

	 const [currentGame, setCurrentGame] = useState(gamesData[0].name);
	 const [placedBet, setPlacedBet] = useState(10);

	 const controlPlacedBet = (e) =>{
	 		 e.target.value > 100 ? console.log('too high') :setPlacedBet(e.target.value);
	 		}

	return (
		<section className="bet_page app-flex-wrap">
			
			<div className="main_container app-flex">
				<div className="game">
				 	<img src={files.valo} alt="game-walpaper" className="game-walp"/>
				 	<div className="overlay"></div>
				 	<h3 className="name">LEAGUE of legends</h3>
				</div>
				
				<div className="game_sets app-flex-wrap">
					<div className="app-flex select_container">
						<h4 className="def">Select Game : </h4>
						<select className="selector">	
							<option>{gamesData[0].name}</option>
							<option>{gamesData[1].name}</option>
							<option>{gamesData[2].name}</option>
						</select>
					</div>
					<div className="app-flex select_container">
						<h4 className="def">Game Mode : </h4>
						<select className="selector">	
							<option>{gamesData[0].modes[0]}</option>
							<option>{gamesData[0].modes[1]}</option>
							<option>{gamesData[0].modes[2]}</option>
						</select>
					</div>
					
					<div className="amount select_container">
						<div className="app-flex select_container">
							<h4 className="def">Placed Bet : </h4>
							<span className="input selector app-flex">	
								<h5>$</h5>
								<input type="number" className="bet" value={placedBet} onChange={(e)=> controlPlacedBet(e)}/>
							</span>
						</div>
						<span className="warn app-flex">
							<BsFillCircleFill className="warn-icon" />
							<h6 className="warn-text">The bet should be equal for both parties, any bet differences will cause an abort for the current bet, GL HF :D!</h6>
						</span>
					</div>

					<div className="players select_container app-flex">
						<h4 className="def">Players : </h4>
						<div className="players-table selector app-flex-wrap">
							<div className="app-flex table-key">
								<h6 style={{marginRight:'auto'}}>Player</h6>
								<h6>Status</h6>
								<h6 style={{marginLeft:'auto'}}>Bet</h6>
							</div>

							<div className="crossing-bar adj"></div>

							<div className="players-container app-flex-wrap">
								<span className="player app-flex" style={{backgroundColor:'var(--primary-color)'}}>
									<img src={picture} alt="player-pp" className="player-pp pointer"/>
									<h6 style={{marginRight:'auto'}} className="pointer">Aminedesu</h6>
									<h6 className="status">Online</h6>
									<h6 style={{marginLeft:'auto'}}>${placedBet}</h6>
								</span>

								<span className="player app-flex">
									<img src={picture} alt="player-pp" className="player-pp"/>
									<h6 style={{marginRight:'auto'}}>Aminedesu</h6>
									<h6 className="status">Online</h6>
									<h6 style={{marginLeft:'auto'}}>$60</h6>
								</span>

								<span className="player pointer app-flex" style={{backgroundColor:'var(--primary-color)'}}>
									<IoIosAddCircle className="add-icon"/>
									<h5>Add Player</h5>
								</span>
							</div>	
						</div>
					</div>
				</div>
			</div>

			<div className="btns app-flex">
				<button className="main-btn">
					Start Bet
				</button>
				<button className="sub-btn">
					Cancel
				</button>
			</div>
		</section>
	)
}

export default Challenge;