import React, {useState} from 'react';
import './Support.scss';
import {useNavigate} from 'react-router-dom';

import Cinput from '../../Components/Input/Input';

const Support = () => {

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [issue, setIssue] = useState('');

	const navigate = useNavigate();

	return (
		<div className="support_main">	
			<div className="main_container app-flex-wrap">
				<div className="head app-flex-wrap" style={{gap:'5px'}}>
					<h3>Contact Support</h3>
					<p>Are you having and issue or you encoutered a problem in <span className="highlight"> SquidStacks</span> ? feel free to send our support staff a <span className="highlight">Ticket</span> . </p>
				</div>
				<div className="inputs app-flex-wrap">
					<Cinput placeholder="Your Username" type="text" input="username" handler={username} setHandler={setUsername}/>
					<Cinput placeholder="Your Email"  type="text" input="email" handler={email} setHandler={setEmail}/>
					<textarea className="input-area" placeholder="Your Issue" onChange={(e)=>setIssue(e.target.value)}/>
				</div>
				<div className="app-flex" style={{width:'100%'}}>
					<button className="main-btn" onClick={()=>navigate('/')}>
						Send Ticket
					</button>
				</div>
			</div>
		</div>
	)
}

export default Support