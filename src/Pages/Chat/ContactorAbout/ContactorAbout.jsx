import React from 'react';
import './ContactorAbout.scss';

import {BiBlock} from 'react-icons/bi';
import {IoPerson} from 'react-icons/io5';
import {MdArrowBackIos} from 'react-icons/md';

import picture from '../../../Assets/profile.jpg';
import {files} from '../../../Assets';

const ContactorAbout = ({setShowAbout}) => {
	return (
		<section className="contactorAbout">
				<div className="back-btn" onClick={()=>setShowAbout(false)}>
					<MdArrowBackIos className="back-icon"/>
				</div>
				<div className="about-header app-flex-wrap">
					<div className="pics">
						<img src={files.raven} className="about-cover" alt="cover"/>
						<div className="overlay"></div>
						<img src={picture} className="user-p" alt="user-p"/>
					</div>
					<h3 className="username">Aminedesu</h3>
				</div>

				<div className="about-buttons app-flex">
					<span className="app-flex btn">
						<IoPerson className="icon"/>
						<h4>Profile</h4>
					</span>
					<span className="app-flex btn">
						<BiBlock className="icon"/>
						<h4>Block</h4>
					</span>
				</div>

				<div className="about-actions">
				</div>
		</section>
	)
}

export default ContactorAbout