import React from 'react';
import './Testes.scss';

import star from '../../Assets/icons/star.png';

const Testes = () => {
	return (
		<article className="testemoniel">
			<div className="container">
				<span className="teste-info" style={{opacity:"0.7"}}>
					<h5>Amine</h5>
					<h5 style={{marginLeft:'auto'}}>Feb 2</h5>
				</span>
				<span className="stars">
					<img src={star} alt="start" className="star"/>
					<img src={star} alt="start" className="star"/>
					<img src={star} alt="start" className="star"/>
					<img src={star} alt="start" className="star"/>
					<img src={star} alt="start" className="star"/>
				</span>
				<p className="p-text title" style={{textTransform:'uppercase'}}>So Awsome!</p>
				<h4 className="teste-data" style={{opacity:"0.7", fontWeight:'300'}}>Finally i can challenge people and gain money,
						and push my limits to another level all at once.
					    Totall recommend it</h4>
			</div>
		</article>
	)
}

export default Testes