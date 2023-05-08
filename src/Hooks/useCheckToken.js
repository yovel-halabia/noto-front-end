import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useCheckTokenQuery} from "../Redux/Services/authApi";

export default function useCheckToken() {
	const {error, isFetching} = useCheckTokenQuery(undefined, {refetchOnMountOrArgChange: true});
	const navigate = useNavigate();

	useEffect(() => {
		if (error && !isFetching) {
			navigate("/login");
		}
	}, [error]);
	return;
}
