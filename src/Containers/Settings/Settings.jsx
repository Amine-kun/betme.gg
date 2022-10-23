import React, {useState, useEffect} from 'react';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import './Settings.scss';

import Navbar from '../../Components/Navbar/Navbar';
import ProfileSettings from '../../Pages/ProfileSettings/ProfileSettings';
import SecuritySettings from '../../Pages/SecuritySettings/SecuritySettings'

const tabs = ['Profile Settings', 'Security Settings', 'Billing', 'Support'];

const Settings = () => {

	const [activeTab, setActiveTab] = useState('Profile');
	const navigate = useNavigate();
	const location = useLocation();
   
	
	useEffect(() => {
		if (!location.pathname.split('/')[2]){
			setActiveTab('Profile')
		} else{
			setActiveTab(location.pathname.split('/')[2])
		}
	}, [location])


	const handleNavigation = (tab) =>{
		tab.split(' ')[0] === 'Profile' 
			? navigate('/Settings')
			: navigate(tab.split(' ')[0])
			
			 setActiveTab(tab)
	}
	return (
		<section className="settings_main app-flex">
			<div className="container">
				<Navbar/>

				<main className="content-container app-flex">
					<div className="settings-sidebar">
						<ul className="tabs">
							
							{tabs.map((tab, i)=>(
								<li className={`item ${activeTab === tab.split(' ')[0]  && 'activated'}`} 
								key={i}
								onClick={()=>handleNavigation(tab)}>

									{tab}

								</li>
								))}

						</ul>
					</div>
					<div className="settings-panel">
						<Routes>
							<Route path='/' element={<ProfileSettings/>}/>
							<Route path='Security' element={<SecuritySettings/>}/>
						</Routes>
					</div>
				</main>

			</div>
		</section>
	)
}

export default Settings;