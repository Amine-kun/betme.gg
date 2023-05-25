import React from 'react';
import './Testes.scss';

import star from '../../Assets/icons/star.png';

let stars = [1, 2 , 3 , 4 , 5];

const Testes = ({data}) => {
	return (
		<article className="testemoniel">
			<div className="container">
				<span className="teste-info" style={{opacity:"0.7"}}>
					<h5>{data.user}</h5>
					<h5 style={{marginLeft:'auto'}}>{data.date}</h5>
				</span>
				<span className="stars">
					{
						stars.map((s , i)=>(
							s <= data.stars &&
							<img src={star} alt="start" className="star" ket={i}/>
						))
					}
				</span>
				<p className="p-text title" style={{textTransform:'uppercase'}}>{data.title}</p>
				<h4 className="teste-data" style={{opacity:"0.7", fontWeight:'300'}}>{data.message}</h4>
			</div>
		</article>
	)
}

export default Testes