
import React, {useState, useEffect} from 'react';
import './Profile.scss';
import {Link, Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import {files} from '../../Assets';
import picture from '../../Assets/profile.jpg';
import useAxios from '../../utils/useAxios';

import Loading from '../../Components/Loading/Loading';
import Overview from './Profile_subs/Overview/Overview';
import Tournements from './Profile_subs/Tournements/Tournements';
import Stats from './Profile_subs/Stats/Stats';

const tabs = ["Overview","Tournements","Stats","About"];

const Profile = ({userData}) => {

	const location = useLocation();
	const navigate = useNavigate();
	const [activeBtn, setActiveBtn] = useState('Overview');
	const [loading, setLoading] = useState(true);
	const [profileData, setProfileData] = useState(null)
	const api = useAxios()

	useEffect(() => {
		var path = location.pathname.split("/")[2];
		if(path === 'Tournements' || path === 'Stats' || path === 'About'){
			setActiveBtn(path);
		} else{
			setActiveBtn('Overview');
		}

		if(parseInt(path) === userData.main_id ){
			setProfileData(userData)
			console.log('user')
			setLoading(false)
		}else {
			api.get(`/api/profile/?uid=${path}`)
			.then(res=>{
				setProfileData(res.data)
				setLoading(false)
			})
			.catch(err=>console.log('cannot get profile'))
		}

	}, [location])

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
								<h3>{profileData?.username}</h3>
								<h5 className="user-title">{profileData?.bio}</h5>
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