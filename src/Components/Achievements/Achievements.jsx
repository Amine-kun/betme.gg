import React, {useState} from 'react';
import './Achievements.scss';
import {BiDollarCircle} from 'react-icons/bi';
import {GiPistolGun, GiThunderSkull} from 'react-icons/gi';
import {IoLogoGameControllerA} from 'react-icons/io';

const userAch = [{icon:BiDollarCircle}, {icon:GiPistolGun}, {icon:GiThunderSkull}, {icon:IoLogoGameControllerA}];

const Achievements = () => {

	const [active, setActive] = useState(1);
	let ActiveIcon = userAch[active].icon;

	return (
		<div className="app-flex-wrap Achievements">
			<div className="active-icon app-flex">
				<ActiveIcon className="ach-icon"/>
				<span className="app-flex-wrap ach-info">
					<h5>RISH BOY {active}</h5>
					<p style={{fontSize:'0.7rem'}}>Earn $1000 in total from tournements Or defeating players in a 1v1.</p>
				</span>
			</div>

			<div className="ach-icons app-flex">
				{userAch.map((achieve, i)=>(
					<achieve.icon className="pointer ach-icon" onClick={()=>setActive(i)} key={i}/>
					))}
			</div>
		</div>	
	)
}

export default Achievements;