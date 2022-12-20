import React , {useState, useEffect, useContext} from 'react';
import './Navbar.scss';
import picture from '../../Assets/profile.jpg';
import {useNavigate, useLocation, Link} from	'react-router-dom';
import AuthContext from "../../context/AuthContext";

import {IoNotifications} from 'react-icons/io5';
import {MdArrowDropDown, MdArrowRight} from 'react-icons/md';
import {FaUserFriends} from 'react-icons/fa';

const navTabs = ["Home", "Esports", "Events", "Updates"];

const Navbar = ({showFriends, setShowFriends}) => {

	const navigate = useNavigate();
	const location = useLocation();
	const { user, logoutUser } = useContext(AuthContext);
	const [activeNav, setActiveNav] = useState("Home");
	const [isNotification, setIsNotification] = useState(false);
	const [userDrop, setUserDrop] = useState(false);

	useEffect(() => {
		if(location.pathname.split('/')[1] !== ''){
				setActiveNav(location.pathname.split('/')[1]);
			} else {
				setActiveNav('Home');
			}
			
	}, [location.pathname])
	return (
		<nav className="navbar-main app-flex">
			{location.pathname.split('/')[1] === '' 
				?  navTabs.map((tab, i)=>(
					<h5 className={`pointer ${activeNav === tab  && 'active'} ${tab !== 'Home' && 'hide'}`} key={i} onClick={()=>setActiveNav(tab)}>
						{tab}
					</h5>))

				: 	<h5 className={`pointer ${activeNav === 'Home' && 'active'}`} onClick={()=>{setActiveNav('Home'); navigate('/')}}>
						Home
					</h5>
				}

			<section className="rightSide app-flex"> 					
				<div className={`notification ${showFriends && 'active-tab'}`} onClick={()=> setShowFriends(true)}>
					<FaUserFriends className='notification-icon'/>
					<span className="red-dot app-flex">5</span>
				</div>

				<div className={`notification ${isNotification  && 'active-tab'}`} onClick={(e)=>setIsNotification(!isNotification)}>
					<IoNotifications className='notification-icon'/>
					<span className="red-dot app-flex">3</span>
					<div className={`drop-notification app-flex ${isNotification && 'show-notification'}`} onClick={(e)=> e.stopPropagation()}>
						<h6>You have no notifications at the moment.</h6>
						<span className="arrow"></span>
					</div>
				</div>
				
				<div className={`profile-tab app-flex ${(activeNav === 'Profile' || userDrop) && 'active'}`} onClick={()=> setUserDrop(!userDrop)}>
					<img src={picture} alt="profile" className="p-p"/>
					<div className="app-flex-wrap user" style={{gap:'2px'}}>
						<h4 className="userName">Aminedesu</h4>
						<h6 className="status">Online</h6>
					</div>
					{userDrop ? <MdArrowDropDown /> : <MdArrowRight />}

					<div className={`user-drop-down ${userDrop && 'show'}`} onClick={(e)=>{ e.stopPropagation(); setUserDrop(false)}}>
						<div className="upper app-flex" onClick={()=>navigate('/Profile')}>
							<img src={picture} alt="profile" className="p-p"/>
							<h5>Aminedesu</h5>
						</div>
						<div className="crossing-bar"></div>
						<div className="drop-tabs app-flex-wrap">	
							<Link to="/Settings" className="tab">
								<h4>Settings</h4>
							</Link>
							<Link to="/Help_Center" className="tab">
								<h4>Help</h4>
							</Link>
							<a className="tab pointer" onClick={logoutUser}>
								<h4>Logout</h4>
							</a>
						</div>
					</div>
				</div>
			</section>
		</nav>
	)
}

export default Navbar