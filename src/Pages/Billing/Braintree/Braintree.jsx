import React, {useState, useEffect} from 'react';
import './Braintree.scss';
import dropin from "braintree-web-drop-in";
import useAxios from '../../../utils/useAxios';

const Braintree = () => {

	const [braintreeInstance, setBraintreeInstance] = useState(undefined);
	const [status, setStatus] = useState(false);
	const BRAINTREE_API = process.env.REACT_APP_BRAINTREE_API;
	const api = useAxios();

	 const handlePaying =()=>{
                    if (braintreeInstance) {
                        braintreeInstance.requestPaymentMethod(
                            (error, payload) => {
                                if (error) {
                                    console.error(error);
                                } else {
                                	setStatus(true)
                                    const paymentMethodNonce = payload.nonce;
                                    console.log("payment method nonce", payload.nonce);

                     				api.post('/api/confirm_payment/',{
                     					paymentMethodNonce:paymentMethodNonce,
                     					amount:5
                     				})
                     				.then(res=>{
                     					console.log(res)
                     					window.close()
                     				})
                     				.catch(err=>console.log(err))

                                }
                            });
                    }
                }

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
		<section className="cc app-flex-wrap">
			<div id={"braintree-drop-in-div"}>
			</div>
			{!status &&
				 <button className="main-btn" type="primary" disabled={!braintreeInstance} onClick={()=>handlePaying()}>
					buy
				</button>}
		</section>
	)
}

export default Braintree