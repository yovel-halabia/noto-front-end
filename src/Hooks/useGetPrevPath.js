import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useGetPrevPath() {
	const { pathname } = useLocation();
	const [prevPath, setPrevPath] = useState(pathname);

	useEffect(() => {
		setPrevPath(pathname);
	}, [pathname]);

	return prevPath;
}
