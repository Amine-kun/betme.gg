import React, {useState, useEffect} from 'react';
import './Billing.scss';
import {GrPaypal} from 'react-icons/gr';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import MessagePanel from '../../Components/MessagePanel/Message';

const Billing = () => {
	const [message, setMessage] = useState({show:false ,status:false, message:null});
	const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID

	 const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "10 SP",
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

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
        });
    };

    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };

    useEffect(() => {
        if (success) {
            alert("Payment successful!!");
            console.log('Order successful . Your order id is--', orderID);
        }
    },[success]);

	return (
		<PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
		<div className="billing_main app-flex-wrap">

			<MessagePanel status={message.show} message={message.message}/>

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
			</div>
			<span className="crossing-bar"></span>
			<div className="others">
				<h3>Other Billing Methods</h3>
				<div className="link" style={{fontSize:'1rem'}}>
				  Will be added later
				</div>
			</div>	
		</div>
		</PayPalScriptProvider>
	)
}

export default Billing