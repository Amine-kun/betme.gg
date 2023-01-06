import React from 'react';
import './Loading.scss';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';

const Loading = () => {
	return (
		<div className="full app-flex">
			<AiOutlineLoading3Quarters className="loading-icon"/>
		</div>
	)
}

export default Loading