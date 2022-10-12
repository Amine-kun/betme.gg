import React from 'react';
import './Conversations.scss';

import SingleContact from '../../../Components/SingleContact/SingleContact';

const Conversations = () => {
	return (
		<section className="Conversations app-flex-wrap">
			<div className="chats__header app-flex">
				<span className="section__header">
					Chats
				</span>
			</div>
			<div className="contacts">
				<span className="scroller"> 
					<SingleContact/>
					<SingleContact/>
					<SingleContact/>
					<SingleContact/>
					<SingleContact/>
					<SingleContact/>
					<SingleContact/>
					<SingleContact/>
					<SingleContact/>
					<SingleContact/>
				</span>
			</div>
		</section>
	)
}

export default Conversations