import React , {useState, useEffect, useContext} from 'react';
import './Navbar.scss';
import {useNavigate, useLocation, Link} from	'react-router-dom';
import AuthContext from "../../context/AuthContext";
import useAxios from '../../utils/useAxios';

import Loading from '../Loading/Loading';
import {IoNotifications} from 'react-icons/io5';
import {MdArrowDropDown, MdArrowRight} from 'react-icons/md';
import {FaUserFriends} from 'react-icons/fa';
import {MdOutlineClose} from 'react-icons/md';
import {RiSearch2Fill} from 'react-icons/ri';

// const navTabs = ["Home", "Esports", "Events", "Updates"];
const navTabs = ["Home"];

const Navbar = ({showFriends, setShowFriends,friends, startListening, getParty, setSearch}) => {

	const navigate = useNavigate();
	const location = useLocation();
	const { logoutUser } = useContext(AuthContext);

	const [activeNav, setActiveNav] = useState("Home");
	const [isNotification, setIsNotification] = useState(false);
	const [userDrop, setUserDrop] = useState(false);
	const [notifications, setNotifications] =useState([]);
	const [loading, setLoading] = useState(true);

	const api = useAxios();

	const read = (id)=>{
		const markAsRead = api.get(`/notifications/mark-as-read/${id}/`);
	} 
	const acceptChallenge =async(id, notificationId, side)=>{
		let party = await getParty()
		if(party  === null){
			let team;

			if(side[side?.length-6] === 't'){
				team = 'B';
			} else {
				team = 'A';
			}

			read(notificationId);
			localStorage.setItem("partystatus", JSON.stringify({status:'invited', id:id, team:team}));
			setIsNotification(false)
			startListening();
			navigate(`/Challenge/${id}`)
		} else {
			console.log('You are already in a party, leave it to accept Challenge')
		}
	}

	const acceptFriend = (actorid, id) =>{
		let isSent = false;
		read(id);
		if(!isSent){
			isSent = true;
			api.post('/api/friends/',{id:actorid})
		 		.then((res)=>console.log(res.data)).catch(err=>console.log(err));
		} else {
			console.log('aleady accepted')
		}
		
	}
	
	const deleteNotification= (id)=>{
		let newnoti = notifications.filter((target)=>{
			return target.id !== id;
		})
		setNotifications(newnoti);
		const deleteNotify = api.delete(`/notifications/delete/${id}/`);
	}

	const userData = localStorage.getItem("userinfo")
		                      ? JSON.parse(localStorage.getItem("userinfo"))
		                      : null 

	useEffect(() => {
		let notificationPooler = setInterval(async () =>{
				try{
				     const res = await api.get('/notifications/unread/');
				     setNotifications(res.data)
				     setLoading(false);
				} catch(e){
					return 'something went wrong'
				}
			}, 5000);

		return ()=>{
			clearInterval(notificationPooler);
		}
	}, [setIsNotification])

	useEffect(() => {
		if(location.pathname.split('/')[1] !== ''){
				setActiveNav(location.pathname.split('/')[1]);
		} else {
				setActiveNav('Home');
			}			
	},[location.pathname])

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
				{location.pathname.split('/')[1] != 'Settings' && 
					<>
					<div className="notification" onClick={()=>setSearch(true)}>
						<RiSearch2Fill className='notification-icon'/>
					</div>

					<div className={`notification ${showFriends?.status && 'active-tab'}`} onClick={()=> setShowFriends({status:true,team:'A'})}>
						<FaUserFriends className='notification-icon'/>
						{friends?.length > 0 && <span className="red-dot app-flex">{friends?.length}</span>}
					</div>

					<div className={`notification ${isNotification  && 'active-tab'}`} onClick={(e)=>setIsNotification(!isNotification)}>
						<IoNotifications className='notification-icon'/>
						<span className="red-dot app-flex">{notifications?.length}</span>
						<div className={`drop-notification app-flex-wrap ${isNotification && 'show-notification'}`} onClick={(e)=> e.stopPropagation()}>
							
							{loading && <Loading/>}
							{!loading && notifications?.length < 1
								? <h6>You have no notifications at the moment</h6>
								: notifications.map((notify, i)=>(
										notify.verb !== 'FriendRequest' 
											?	<div key={i} className="single-notify" onClick={()=>acceptChallenge(notify.verb, notify.id, notify.description)}>
													<MdOutlineClose className="cancel-icon" onClick={(e)=>{e.stopPropagation(); deleteNotification(notify.id)}}/>
													<div className="unread"></div>
													<h6>{notify.description}</h6>
													<h6>Click to accept challenge.</h6>
												</div>
											: 	<div key={i} className="single-notify" onClick={()=>navigate(`/Profile/${notify.id}`)}>
													<div className="full">
														<div className="unread"></div>
														<h6>{notify.description}</h6>
													</div>
													<div className="app-flex accept_rej">
														<h6 className="action-btn accept app-flex" onClick={(e)=>{e.stopPropagation(); acceptFriend(notify.actor.id, notify.id)}}>Accept</h6>
														<h6 className="action-btn reject app-flex" onClick={(e)=>{e.stopPropagation(); deleteNotification(notify.id)}}>Reject</h6>
													</div>
												</div>
										
								))}
							<span className="arrow"></span>
						</div>
					</div>
					</>}
				
				<div className={`profile-tab app-flex ${(activeNav === 'Profile' || userDrop) && 'active'}`} onClick={()=> setUserDrop(!userDrop)}>
					<div className="p-p">
						<img src={userData?.profile_picture} alt="profile" className="p"/>
					</div>
					<div className="app-flex-wrap user" style={{gap:'2px'}}>
						<h4 className="userName">{userData.username.charAt(0).toUpperCase() + userData.username.slice(1)}</h4>
						<h6 className="status">Online</h6>
					</div>
					{userDrop ? <MdArrowDropDown /> : <MdArrowRight />}

					<div className={`user-drop-down ${userDrop && 'show'}`} onClick={(e)=>{ e.stopPropagation(); setUserDrop(false)}}>
						<div className="upper app-flex" onClick={()=>navigate(`/Profile/${userData.main_id}`)}>
							<img src={userData?.profile_picture} alt="profile" className="p-p" style={{objectFit:'cover'}}/>
							<h5>{userData.username.charAt(0).toUpperCase() + userData.username.slice(1)}</h5>
						</div>
						<div className="crossing-bar"></div>
						<div className="drop-tabs app-flex-wrap">	
							<Link to="/Settings" className="tab">
								<h4>Settings</h4>
							</Link>
							<Link to="/Help_Center" className="tab">
								<h4>Help</h4>
							</Link>
							<button className="sub-btn tab pointer" onClick={logoutUser}>
								<h4>Logout</h4>
							</button>
						</div>
					</div>
				</div>
			</section>
		</nav>
	)
}

export default Navbar