import { useEffect } from "react";
import "./Category.css";

import { useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { useGetProductQuery } from "../../Redux/Services/productApi";

import CategoryItem from "./CategoryItem";

const variants = {
	enter: (location) => {
		const direction = location.pathName.indexOf("women") > -1 ? "100%" : "-100%";
		return {
			left: direction,
		};
	},
	center: { left: 0 },
	exit: (location) => {
		const direction = location.prevPath.indexOf("women") > -1 ? "100%" : "-100%";
		return {
			left: direction,
		};
	},
};

export default function Category({ prevPath }) {
	const { pathname } = useLocation();
	const { categoryId } = useParams();
	const { data } = useGetProductQuery(`get-category-products/${categoryId}`);

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
			transition={{ type: "spring", stiffness: 70 }}
			custom={{ pathName: pathname, prevPath: prevPath }}>
			<div className="category page">
				{data && (
					<>
						<h1>
							{categoryId
								.split("-")
								.map((name) => {
									return name[0].toUpperCase() + name.slice(1);
								})
								.join(" ")}
						</h1>
						<div className="category__items-container">
							{data.map((item) => (
								<CategoryItem item={item} />
							))}
						</div>
					</>
				)}
			</div>
		</motion.div>
	);
}
