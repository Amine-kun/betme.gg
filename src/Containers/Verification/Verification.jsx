import React from 'react';
import './Verification.scss';

import emailPic from '../../Assets/icons/email.png'

const Verification = () => {
	return (
		<section className="ver_container app-flex">
			<img src={emailPic} alt="emailing" className="email-pic"/>
			<div>
				<h4>This is a text example  and sdgas asdfnsdf saf d fs f sf sdf sad fsadfsadfsadf sdf sdf sdfasdf default</h4>
				<h4>Please hold tight while we are verifying you email.</h4>
				<h2>Loader</h2>
			</div>
			<span className="bar"></span>
			<div>
				<h5>Rights sections.</h5>
			</div>
		</section>
	)
}

export default Verification;