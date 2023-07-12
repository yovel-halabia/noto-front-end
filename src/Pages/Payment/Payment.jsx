import {useState, useRef, useEffect} from "react";
import "./Payment.css";

import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { userApi, useUpdateUserMutation } from "../../Redux/Services/userApi";


import ProgressBar from "./ProgressBar";
import SubTotal from "./SubTotal";
import CartItem from "../../Components/Cart/CartItem";
import Address from "../../Components/Address/Address";
import CreditCard from "../../Components/CreditCard/CreditCard";
import PaymentStep from "./PaymentStep";
import ErrAlert from "../../Components/ErrAlert";

export default function Payment() {
	const {hash} = useLocation();
	const navigate = useNavigate();
	const [errMssg, setErrMssg] = useState("");
	const [stepCheck, setStepCheck] = useState({});
	const {data} = userApi.endpoints.getUser.useQueryState();
	const [updateUser] = useUpdateUserMutation();

	useEffect(() => {
		if (hash === "#pay" && (!stepCheck.cart || !stepCheck.address)) navigate("#cart");
		if (hash === "#address" && !stepCheck.cart) navigate("#cart");
		if (hash !== "#cart" && hash !== "#address" && hash !== "#pay") navigate("#cart");
	}, [hash]);

	const onClick = () => {
		setErrMssg("");
		switch (hash) {
			case "#cart":
				if (data?.cartItems?.items?.length > 0) {
					setStepCheck({...stepCheck, cart: true});
					navigate("#address");
				} else setErrMssg("your cart is empty");
				break;
			case "#address":
				if (data?.address?.some((address) => address.isDefault)) {
					setStepCheck({...stepCheck, address: true});
					navigate("#pay");
				} else setErrMssg("you must to choose address");
				break;
			case "#pay":
				data?.cards?.some((card) => card.isDefault) ? handlePay() : setErrMssg("you must to choose credit card to pay");
				break;
			default:
				navigate("#cart");
		}
	};

	const handlePay = () => {
		var addressIndex = data?.address?.findIndex((address) => address.default === true);
		updateUser({
			url: "pay",
			body: {
				items: data?.cartItems?.items,
				total: data?.cartItems?.total,
				address: data?.address[addressIndex],
			},
		})
			.unwrap()
			.then(() => navigate("/orders"))
			.catch(({data}) => {
				if (data.authErr) {
					navigate("/login");
				} //else setErrMssg("something went wrong try agin later");
			});
	};

	return (
		<div className="payment page">
			<ProgressBar />
			<AnimatePresence>
				{hash === "#cart" && (
					<PaymentStep
						title="Confirm Items"
						btnTxt="Continue to payment"
						onClick={onClick}
						childrens={
							<>
								<div className="payment__items-container">
									{data?.cartItems?.items.length > 0 ? (
										data?.cartItems?.items?.map((item, i) => <CartItem key={i} item={item} />)
									) : (
										<div className="payment__item-no-items">
											<strong>NO ITEMS IN CART</strong>
										</div>
									)}
								</div>
								<SubTotal />
							</>
						}
					/>
				)}

				{hash === "#address" && (
					<PaymentStep
						title="Select or add a shipping address"
						btnTxt="Continue to payment"
						onClick={onClick}
						childrens={
							<>
								<Address />
								<SubTotal />
							</>
						}
					/>
				)}

				{hash === "#pay" && (
					<PaymentStep
						title="Select your payment method"
						btnTxt="pay"
						onClick={onClick}
						childrens={
							<>
								<CreditCard />
								<SubTotal />
							</>
						}
					/>
				)}
			</AnimatePresence>
			{errMssg !== "" && <ErrAlert text={errMssg} />}
		</div>
	);
}
