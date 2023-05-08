import React from "react";
import "./Home.css";

import {Link} from "react-router-dom";

import {useGetProductQuery} from "../../Redux/Services/productApi";

import Carousel from "./Carousel";

export default function Home() {
	const {data} = useGetProductQuery("get-sales-product");

	return (
		<div className="home page">
			<div className="home__categories-container">
				<Link to="category/women">
					<img src="https://emac.co.tz/wp-content/uploads/2014/01/womens-category.jpg" alt="womens category" />
				</Link>
				<Link to="category/men">
					<img
						src="https://i0.wp.com/www.hospiceofmiamicounty.org/wp-content/uploads/2014/01/mens-category.jpg?fit=500%2C400&ssl=1"
						alt="mens category"
					/>
				</Link>
			</div>
			{data && <Carousel title="Sales" slides={data[0]?.products} />}
		</div>
	);
}
