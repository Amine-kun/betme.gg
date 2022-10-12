import React from 'react';
import './SingleContact.scss';
import picture from '../../Assets/profile.jpg';

const SingleContact = () => {

	let temp ="You : Yes i know this should be so long to test";
	let splited = temp.split(" ");

	return (
		<div className="contact app-flex">

					<div className="user-p-s">
						<img src={picture} alt="user-p" className="user-p"/>
						<span className="status"></span>
					</div>

					<div className="convo-info app-flex-wrap">
						<h4>Aminedesu</h4>
						<h6 className="recent-text">
						
							{temp.length > 20 
								? temp.substring(0, 25) + "..."
								: temp}

						</h6>
					</div>
					<span className="time">
						<h6>3h</h6>
					</span>
				</div>
	)
}

export default SingleContact