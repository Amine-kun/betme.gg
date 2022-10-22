import React, {useState} from 'react';
import './ProfileSettings.scss';
import {files} from '../../Assets';
import picture from '../../Assets/profile.jpg';

import {BiCamera} from 'react-icons/bi';

const ProfileSettings = () => {

	const [active, setActive] = useState('');

	return (
		<section className="main-setting">
			<div className="first">	
				<img src={files.raven} alt="setting-walp" className="settings-walp"/>
				<div className="user-img-div"> 
					<img src={picture} alt="user-prev-img" className="user-img"/>
					
					<span className="upload">
						<BiCamera className="camera-icon"/>
						<input type="file" placeholder="upload" className="uploader"/>
					</span>

				</div>
			</div>
			<div className="inputs app-flex">
				<span className="input-field"
					onMouseEnter={()=> setActive('name1')}
					onMouseLeave={()=> setActive('')}>

					<h5 className={`field-title ${active && 'active'}`}>Name</h5>
					<input className="input" type="text"/>

				</span>
				<span className="input-field">
					<h5 className="field-title">Name</h5>
					<input className="input" type="text"/>
				</span>
				<span className="input-field">
					<h5 className="field-title">Name</h5>
					<input className="input" type="text"/>
				</span>
				<span className="input-field">
					<h5 className="field-title">Name</h5>
					<input className="input" type="text"/>
				</span>
				<span className="input-field">
					<h5 className="field-title">Name</h5>
					<input className="input" type="text"/>
				</span>
				<span className="input-field">
					<h5 className="field-title">Name</h5>
					<input className="input" type="text"/>
				</span>
			</div>
		</section>
	)
}

export default ProfileSettings;