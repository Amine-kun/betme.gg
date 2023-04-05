import React, {useState, useEffect} from 'react';
import './Billing.scss';
import {GrPaypal} from 'react-icons/gr';
import {BsFillCreditCard2BackFill} from 'react-icons/bs';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import MessagePanel from '../../Components/MessagePanel/Message';
import useAxios from '../../utils/useAxios'

const Billing = () => {
	const [message, setMessage] = useState({show:false ,status:false, message:null});
    const [orderID, setOrderID] = useState(false);

    const [loading, setLoading] = useState(true);

    const api = useAxios();
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID

	 const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "50 SP",
                    amount: {
                        currency_code: "USD",
                        value: 5,
                    },
                },
            ],
        }).then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    const openBraintree = ()=>{
    	let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
						width=700,height=900,left=-1000,top=-1000`;
    	window.open('/Billing/CreditCard/', '',params);
    }

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            
            	api.post('/api/confirm_payment_paypal/',{
            		amount:5,
            		payer_id:payer.payer_id
            	}) .then((res)=>{
            		setLoading(true)
					setMessage({show:true, status:true, message:'Verifying payement...'})

					setMessage({show:true, status:true, message:'Congrats, 50 SP has been added to your account.'})
					setTimeout(()=>{setLoading(false)}, 1000)
					setTimeout(()=>{setMessage({...message, show:false})},3000)

            	}) .catch(err=>console.log('ERR_AT_SAVING_BILLING'))
        });
    };

    const onError = (data, actions) => {
			setLoading(true)
			setMessage({show:true, status:true, message:'Verifying payement...'})

			setMessage({show:true, status:true, message:'An Error occured with your payment'})
			setTimeout(()=>{setLoading(false)}, 1000)
			setTimeout(()=>{setMessage({...message, show:false})},3000)
    };

	return (
		<PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
		<div className="billing_main app-flex-wrap">

			<MessagePanel status={message.show} message={message.message} loading={loading}/>

			<div className="paypal">	
				<h3>  
					<span className="highlight" style={{fontSize:'20px'}}>SquidStacks </span>
					Billing.
				</h3>
				<div className="app-flex link">
					<GrPaypal/>
					<h4>Paypal</h4>

					<button className=" btn-float second-main-btn" style={{marginLeft:'auto', padding:'0'}}>
						<PayPalButtons
							className="hide"
	                        style={{ layout: "horizontal", color: "blue", height:45 }}
	                        createOrder={createOrder}
	                        onApprove={onApprove}
	                    />
	                    <h4 className="float">Get SP</h4>
					</button>
                 
				</div>
				<div className="app-flex link">
					<BsFillCreditCard2BackFill/>
					<h4>Credit Card</h4>

					<button className="second-main-btn" onClick={()=>openBraintree()} style={{marginLeft:'auto', padding:'16px 53px'}}>
						Get SP
					</button>
                 
				</div>
			</div>
			<span className="crossing-bar"></span>
			<div className="others">
				<h3>Other Billing Methods</h3>
				<div className="link" style={{fontSize:'1rem'}}>
				 	Will be added later...
				</div>
			</div>	
		</div>
		</PayPalScriptProvider>
	)
}

export default Billing