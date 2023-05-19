import React from "react";

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import useGetPrevPath from "./Hooks/useGetPrevPath";
import {
	ContactUs,
	Home,
	Login,
	Setting,
	Category,
	Item,
	Orders,
	Payment,
	Page404,
} from "./Pages/index";

export default function Router() {
	const location = useLocation();
	const prevPath = useGetPrevPath();

	return (
		<AnimatePresence initial={false}>
			<Routes location={location} key={location.pathname}>
				<Route path="setting" element={<Setting />} />
				<Route path="contact-us" element={<ContactUs />} />
				<Route path="orders" element={<Orders />} />
				<Route path="payment" element={<Payment />} />
				<Route path="item/:itemId" element={<Item />} />
				<Route path="login" element={<Login />} />
				<Route path="*" element={<Page404 />} />
				<Route path="category/:categoryId" element={<Category prevPath={prevPath} />} />
				<Route path="/" element={<Home prevPath={prevPath} />} />
			</Routes>
		</AnimatePresence>
	);
}
