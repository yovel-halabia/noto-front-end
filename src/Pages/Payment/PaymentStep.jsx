import React from "react";
import "./PaymentStep.css";
import { motion } from "framer-motion";

export default function PaymentStep({ title, childrens, onClick, btnTxt }) {
	return (
		<motion.div
			className="payment-step"
			key={title}
			initial={{ x: 1000, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{
				x: { type: "spring", stiffness: 200, damping: 30 },
				opacity: { duration: 0.2 },
			}}>
			<div className="payment-step__inner">
				<h2>{title}</h2>
				{childrens}
				<button className="primary-button" onClick={onClick}>
					{btnTxt}
				</button>
			</div>
		</motion.div>
	);
}
