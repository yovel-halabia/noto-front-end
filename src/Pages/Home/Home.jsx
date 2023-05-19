import React from "react";
import "./Home.css";

import { Link, useLocation } from "react-router-dom";

import { useGetProductQuery } from "../../Redux/Services/productApi";
import { motion } from "framer-motion";

import Carousel from "./Carousel";

const variants = {
	enter: (location) => {
		let direction;
		if (location.prevPath.indexOf("women") > -1) direction = "-100%";
		else if (location.prevPath.indexOf("men") > -1) direction = "100%";
		else if (location.currentPath.indexOf("women") > -1) direction = "-100%";
		else if (location.currentPath.indexOf("men") > -1) direction = "-100%";

		return {
			left: direction,
		};
	},
	center: { left: 0 },
	exit: (location) => {
		let direction;
		if (location.prevPath.indexOf("women") > -1) direction = "-100%";
		else if (location.prevPath.indexOf("men") > -1) direction = "-100%";
		else if (location.currentPath.indexOf("women") > -1) direction = "-100%";
		else if (location.currentPath.indexOf("men") > -1) direction = "100%";

		return {
			left: direction,
		};
	},
};

export default function Home({ prevPath }) {
	const { data: salesProducts } = useGetProductQuery("get-sales-product");
	const { data: menProducts } = useGetProductQuery("get-category-products/men");
	const { data: womenProducts } = useGetProductQuery("get-category-products/women");
	const { pathname } = useLocation();

	return (
		<motion.div
			style={{ width: "100%", position: "absolute", height: "100vh" }}
			variants={
				(pathname.indexOf("category") > -1 || pathname === "/") &&
				(prevPath.indexOf("category") > -1 || prevPath === "/")
					? variants
					: {}
			}
			initial="enter"
			animate="center"
			exit="exit"
			transition={{ type: "spring", stiffness: 50 }}
			custom={{ currentPath: pathname, prevPath: prevPath }}>
			<div className="home page">
				<div className="home__categories-container">
					<Link to="category/men">
						<div>
							<h2>Men</h2>
							<div className="home__arrow home__arrow-left">
								<div></div>
							</div>
						</div>
					</Link>
					<Link to="category/women">
						<div>
							<h2>Woman</h2>
							<div className="home__arrow home__arrow-right">
								<div></div>
							</div>
						</div>
					</Link>
				</div>
				{salesProducts && <Carousel title="Sales" slides={salesProducts[0]?.products} />}
				{menProducts && <Carousel title="For Men" slides={menProducts?.slice(0, 5)} />}
				{womenProducts && <Carousel title="For Women" slides={womenProducts.slice(0, 5)} />}
			</div>
		</motion.div>
	);
}
