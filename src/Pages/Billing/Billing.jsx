import React, {useState, useEffect} from 'react';
import './Billing.scss';
import {GrPaypal} from 'react-icons/gr';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import dropin from "braintree-web-drop-in"
import MessagePanel from '../../Components/MessagePanel/Message';

const Billing = () => {
	const [message, setMessage] = useState({show:false ,status:false, message:null});
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);

    const [braintreeInstance, setBraintreeInstance] = useState(undefined)

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
    const BRAINTREE_API = process.env.REACT_APP_BRAINTREE_API


    const handlePaying =()=>{
                    if (braintreeInstance) {
                        braintreeInstance.requestPaymentMethod(
                            (error, payload) => {
                                if (error) {
                                    console.error(error);
                                } else {
                                    const paymentMethodNonce = payload.nonce;
                                    console.log("payment method nonce", payload.nonce);

                                    alert(`Payment completed with nonce=${paymentMethodNonce}`);

                                }
                            });
                    }
                }

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

    useEffect(() => {

            const initializeBraintree = () => dropin.create({
                // insert your tokenization key or client token here
                authorization: BRAINTREE_API, 
                container: '#braintree-drop-in-div',
            }, function (error, instance) {
                if (error)
                    console.error(error)
                else
                    setBraintreeInstance(instance);
            });

            if (braintreeInstance) {
                braintreeInstance
                    .teardown()
                    .then(() => {
                        initializeBraintree();
                    });
            } else {
                initializeBraintree();
            }
        
    }, [])

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
				<div id={"braintree-drop-in-div"} className="link" style={{fontSize:'1rem'}}>
				 	{/*<button
		                className={"braintreePayButton"}
		                type="primary"
		                disabled={!braintreeInstance}
		                onClick={() => handlePaying()}>
		                Pay
		            </button>*/}
				</div>
			</div>	
		</div>
		</PayPalScriptProvider>
	)
}

export default Billing