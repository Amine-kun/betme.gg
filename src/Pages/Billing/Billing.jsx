import React from 'react';
import './Billing.scss';
import {GrPaypal} from 'react-icons/gr';

const Billing = () => {
	return (
		<div className="billing_main app-flex-wrap">
			<div className="paypal">	
				<h3>Link Your Paypal Account With  
					<span className="highlight" style={{fontSize:'20px'}}> Arena Of Gaming</span>
				</h3>
				<div className="app-flex link">
					<GrPaypal/>
					<h4>Paypal</h4>
					<button className="second-main-btn" style={{marginLeft:'auto'}}>
						Connect
					</button>
				</div>
			</div>
			<span className="crossing-bar"></span>
			<div className="others">
				<h3>Other Billing Methods</h3>
				<div className="link" style={{fontSize:'1rem'}}>
					<h4>Other payment methods will be added sooner...</h4>
				</div>
			</div>	
		</div>
	)
}

export default Billing