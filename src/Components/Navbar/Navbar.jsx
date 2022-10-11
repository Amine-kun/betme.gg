import React , {useState, useEffect} from 'react';
import './Navbar.scss';
import picture from '../../Assets/profile.jpg';
import {useNavigate, useLocation} from	'react-router-dom';

import {IoNotifications} from 'react-icons/io5';
import {MdArrowDropDown} from 'react-icons/md';
import {FaUserFriends} from 'react-icons/fa';

const navTabs = ["Home", "Esports", "Events", "Updates"];

const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [activeNav, setActiveNav] = useState("Home");
	const [isNotification, setIsNotification] = useState(false);
	const [friends, setFriends] = useState(false);

	useEffect(() => {
		if(location.pathname.split('/')[1] !== ''){
				setActiveNav(location.pathname.split('/')[1]);
			} else {
				setActiveNav('Home');
			}
			
	}, [location.pathname])
	return (
		<div className="navbar-main app-flex">
			{location.pathname.split('/')[1] === '' 
				?  navTabs.map((tab, i)=>(
					<h5 className={`pointer ${activeNav === tab  && 'active'} ${tab !== 'Home' && 'hide'}`} key={i} onClick={()=>setActiveNav(tab)}>
						{tab}
					</h5>))

				: 	<h5 className={`pointer ${activeNav === 'Home' && 'active'}`} onClick={()=>{setActiveNav('Home'); navigate('/')}}>
						Home
					</h5>
				}

			<div className="rightSide app-flex"> 					
				<div className={`notification ${isNotification && 'active-tab'}`} onClick={(e)=>setIsNotification(!isNotification)}>
					<IoNotifications className='notification-icon'/>
					<span className="red-dot app-flex">3</span>
					<div className={`drop-notification app-flex ${isNotification && 'show-notification'}`} onClick={(e)=> e.stopPropagation()}>
						<h6>You have no notifications at the moment.</h6>
						<span className="arrow"></span>
					</div>
				</div>
				<div className={`notification ${friends && 'active-tab'}`} onClick={()=> setFriends(!friends)}>
					<FaUserFriends className='notification-icon'/>
					<span className="red-dot app-flex">5</span>
				</div>
				<div className={`profile-tab app-flex ${activeNav === 'Profile' && 'active'}`} onClick={()=>{navigate('/Profile'); setActiveNav('Profile')}}>
					<img src={picture} alt="profile" className="p-p"/>
					<div className="app-flex-wrap user" style={{gap:'2px'}}>
						<h4 className="userName">Aminedesu</h4>
						<h6 className="status">Online</h6>
					</div>
					<MdArrowDropDown/>
				</div>
			</div>
		</div>
	)
}

export default Navbar