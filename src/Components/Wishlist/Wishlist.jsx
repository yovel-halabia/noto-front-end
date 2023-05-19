import {useImperativeHandle, useRef, forwardRef} from "react";
import "./Wishlist.css";

import { useDispatch } from "react-redux";
import {changeWishlistDisplay} from "../../Redux/Reducers/styleSlice";
import {userApi} from "../../Redux/Services/userApi";

import useIsMobile from "../../Hooks/useIsMobile";
import WishlistItem from "./WishlistItem";

import { ReactComponent as BackIcon } from "../../Assets/icons/back_icon.svg";

export default forwardRef(function Wishlist(props, ref) {
	const wishlistRef = useRef(null);
	const dispatch = useDispatch();
	const isMobile = useIsMobile();
	const { data } = userApi.endpoints.getUser.useQueryState();

	useImperativeHandle(ref, () => ({
		handleClickOutSide: (e) => {
			if (!wishlistRef.current?.contains(e.target)) return true;
			else return false;
		},
	}));

	return (
		<div className="wishlist" ref={wishlistRef}>
			{isMobile && (
				<button
					className="wishlist__back-button"
					onClick={() => dispatch(changeWishlistDisplay(false))}>
					<BackIcon />
				</button>
			)}
			{data?.wishlistItems?.length > 0 ? (
				<>
					<div className="wishlist__items">
						{data?.wishlistItems?.map((el, i) => (
							<WishlistItem key={i} item={el} />
						))}
					</div>
				</>
			) : (
				<div className="wishlist__no-items">
					<strong>NO ITEMS IN WISHLIST</strong>
				</div>
			)}
		</div>
	);
});
