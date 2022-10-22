import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import './Settings.scss';

import Navbar from '../../Components/Navbar/Navbar';
import ProfileSettings from '../../Pages/ProfileSettings/ProfileSettings'

const tabs = ['Profile Settings', 'Security Settings', 'Billing', 'Support'];

const Settings = () => {

	const [activeTab, setActiveTab] = useState('Profile Settings');

	return (
		<section className="settings_main app-flex">
			<div className="container">
				<Navbar/>

				<main className="content-container app-flex">
					<div className="settings-sidebar">
						<ul className="tabs">
							
							{tabs.map((tab, i)=>(
								<li className={`item ${activeTab === tab  && 'activated'}`} 
								key={i}
								onClick={()=> setActiveTab(tab)}>

									{tab}

								</li>
								))}

						</ul>
					</div>
					<div className="settings-panel">
						<Routes>
							<Route path='/' element={<ProfileSettings/>}/>
						</Routes>
					</div>
				</main>

			</div>
		</section>
	)
}

export default Settings;