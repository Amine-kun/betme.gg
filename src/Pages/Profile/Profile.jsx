
import React, {useState, useEffect} from 'react';
import './Profile.scss';
import {Link, Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import {files} from '../../Assets';
import picture from '../../Assets/profile.jpg';
import useAxios from '../../utils/useAxios';
import {BsFillPersonDashFill} from 'react-icons/bs';

import Loading from '../../Components/Loading/Loading';
import Overview from './Profile_subs/Overview/Overview';
import Tournements from './Profile_subs/Tournements/Tournements';
import Stats from './Profile_subs/Stats/Stats';

const tabs = ["Overview","Tournements","Stats","About"];

const Profile = ({userData, friends}) => {

	const location = useLocation();
	const path = location.pathname.split("/")[2];
	const navigate = useNavigate();
	const api = useAxios()

	const [activeBtn, setActiveBtn] = useState('Overview');
	const [loading, setLoading] = useState(true);
	const [profileData, setProfileData] = useState(null)
	const [isFriend, setIsFriend] = useState(false);

	const addFriend = (friendID)=>{
 		api.post('/api/send_notification/',{
 			receiver_id:friendID,
 			verb:'FriendRequest',
 			message:`${userData.username} has sent you a friend Request.`
 		}).then(res=>console.log(res.data)).catch(err=>console.log('cannot send a friend request.'))
 	}

	const handleUnfriend = ()=>{
		setIsFriend(false);
		api.delete(`/api/friends?uid=${path}`)
			.then((res)=>{
				console.log(res.data)
			})
			.catch((res)=> console.log('cant delete friend'))
	}

	const handlePath = () =>{
		if(path === 'Tournements' || path === 'Stats' || path === 'About'){
			setActiveBtn(path);
		} else{
			setActiveBtn('Overview');
		}

		if(parseInt(path) === userData.main_id ){
			setProfileData(userData)
			setLoading(false)
		}else {
			api.get(`/api/profile/?uid=${path}`)
			.then(res=>{
				setProfileData(res.data)
				setLoading(false)
			})
			.catch(err=>console.log('cannot get profile'))
		}
	}

	const checkIfFriend = ()=>{
		for (let i=0; i<friends.length ; i++){
			if(friends[i].id === parseInt(path)){
				setIsFriend(true);
				return 1;
			} else {
				setIsFriend(false);
				return 1;
			}
		}
	}

	useEffect(() => {
		handlePath();
		checkIfFriend();
	}, [location, friends])

	return (
		<>
		{loading && <Loading/>}
		{!loading && profileData?.username &&
			<section className="profile app-flex-wrap ">
					<div className="profile_header">
						<div className="walpaper">
							<img src={files.yasuo} alt="walpaper" className="user-walpaper"/>
							<span className="overlay"></span>
							<img src={profileData?.profile_picture} alt="p" className="profile-picture"/>
						</div>
						<div className="user-props app-flex">
							<div className="user-name app-flex-wrap">
								<h3>{profileData.username.charAt(0).toUpperCase() + profileData.username.slice(1)}</h3>
								<h5 className="user-title">{profileData?.bio}</h5>
							</div>
							{parseInt(path) === userData.main_id  
								&& <Link to="/Settings" className="settings">
										<button className="main-btn">Settings</button>
									</Link>  } 
							{parseInt(path) !== userData.main_id && !isFriend
								 && <span className="settings">
										<button className="main-btn">Add Friend</button>
								   </span>}

							{parseInt(path) !== userData.main_id && isFriend
								&& <span className="settings" onClick={()=>handleUnfriend()}>
										<button className="main-btn app-flex" style={{gap:'10px'}}>
											<BsFillPersonDashFill style={{fontSize:'1.1rem', marginBottom:'2px'}}/>
											Unfriend
										</button>
								   </span>
							}
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
							<Route path="/*" element={<Overview/>}/>
							<Route path="/Tournements" element={<Tournements/>}/>
							<Route path="/Stats" element={<Stats/>}/>
						</Routes>
					</div>

			</section>}
		</>
	)
}

export default Profile;