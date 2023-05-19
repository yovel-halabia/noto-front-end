import {useEffect} from "react";

import { getCookie } from "./Util/cookies";

import { useGetUserQuery, useRemoveUserMutation } from "./Redux/Services/userApi";

import useIsMobile from "./Hooks/useIsMobile";

import Header from "./Components/Header";
import BottomNav from "./Components/Nav/BottomNav";
import Nav from "./Components/Nav/Nav";
import Router from "./Router";

function App() {
	const isMobile = useIsMobile();
	const { error } = useGetUserQuery(undefined, { skip: getCookie("accessToken") ? false : true });
	const [removeUser] = useRemoveUserMutation();

	useEffect(() => {
		if (error) {
			removeUser();
		}
	}, [error]);

	return (
		<div className="App">
			<Header />
			<Nav />
			<Router />
			{isMobile && <BottomNav />}
		</div>
	);
}

export default App;
