
import React, {useState, useEffect} from 'react';
import './Profile.scss';
import {Link, Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import {files} from '../../Assets';
import picture from '../../Assets/profile.jpg';

import Overview from './Profile_subs/Overview/Overview';
import Tournements from './Profile_subs/Tournements/Tournements';
import Stats from './Profile_subs/Stats/Stats';
import About from './Profile_subs/About/About';

const tabs = ["Overview","Tournements","Stats","About"];

const Profile = () => {

	const location = useLocation();
	const navigate = useNavigate();
	const [activeBtn, setActiveBtn] = useState('Overview');

	useEffect(() => {
		if(location.pathname.split("/")[2]){
			setActiveBtn(location.pathname.split("/")[2]);
		} else{
			setActiveBtn('Overview');
		}
	}, [location])

	return (
		<div className="profile app-flex-wrap ">
				<div className="profile_header">
					<div className="walpaper">
						<img src={files.yasuo} alt="walpaper" className="user-walpaper"/>
						<span className="overlay"></span>
						<img src={picture} alt="p-p" className="profile-picture"/>
					</div>
					<div className="user-props app-flex">
						<div className="user-name app-flex-wrap">
							<h3>Aminedesu</h3>
							<h5 className="user-title">Disgusting kayn oneTrick xD!</h5>
						</div>
						<Link to="/Settings" className="settings">
							<button className="main-btn">Settings</button>
						</Link>  
					</div>
				</div>
				<span className="bar" style={{cursor:'default'}}></span>
				<div className='app-flex nav'>
					
					{tabs.map((tab, i)=>(
						<h4  key={i}  className={activeBtn === tab ? ' pointer active' : 'pointer'} 
							 onClick={()=>{setActiveBtn(tab); navigate(tab === 'Overview' ? '' : tab)}}>
									{tab}
						</h4>
					))}

				</div>

				<div className='Pages__container'>
					<Routes>
						<Route path="/" element={<Overview/>}/>
						<Route path="/Tournements" element={<Tournements/>}/>
						<Route path="/Stats" element={<Stats/>}/>
						<Route path="/About" element={<About/>}/>
					</Routes>
				</div>

		</div>
	)
}

export default Profile;