import React from 'react';
import './SingleConvo.scss';

import picture from '../../../Assets/profile.jpg';

import {AiOutlineInfoCircle} from 'react-icons/ai';

const SignleConvo = ({setShowAbout}) => {
	return (
		<section className="singleConvo">
			<div className="convo_header app-flex">
				<div className="other-info app-flex">
					<img src={picture} alt='other' className="other"/>
						<span>
							<h4 className="other-name">Aminedesu</h4>
							<h6 style={{color:'var(--green-color)'}}>online</h6>
						</span>
				</div>
				<span className="settings" onClick={()=>setShowAbout(true)}>
					<AiOutlineInfoCircle/>
				</span>
			</div>
		</section>
	)
}

export default SignleConvo