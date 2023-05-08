import {useEffect, useRef} from "react";
import "./Nav.css";

import {Link, useLocation} from "react-router-dom";

import {ReactComponent as Dot_icon} from "../../Assets/icons/dot_icon.svg";

export default function Nav() {
	let location = useLocation();
	const dotRef = useRef(null);
	const homeRef = useRef(null);
	const menRef = useRef(null);
	const womenRef = useRef(null);
	const contactUsRef = useRef(null);

	useEffect(() => {
		homeRef.current.style.color = "#B7B7B8";
		menRef.current.style.color = "#B7B7B8";
		womenRef.current.style.color = "#B7B7B8";
		contactUsRef.current.style.color = "#B7B7B8";
		switch (location.pathname) {
			case "/":
				dotRef.current.style.display = "flex";
				dotRef.current.style.left = "7%";
				homeRef.current.style.color = "#111";
				break;
			case "/category/men":
				dotRef.current.style.display = "flex";
				dotRef.current.style.left = "27%";
				menRef.current.style.color = "#111";
				break;
			case "/category/women":
				dotRef.current.style.left = "50%";
				womenRef.current.style.color = "#111";
				break;
			case "/contact-us":
				dotRef.current.style.display = "flex";
				dotRef.current.style.left = "84%";
				contactUsRef.current.style.color = "#111";
				break;
			default:
				dotRef.current.style.display = "none";
				break;
		}
	}, [location.pathname]);

	return (
		<div className="nav">
			<nav className="nav__nav">
				<ul>
					<li>
						<Link ref={homeRef} to="/">
							Home
						</Link>
					</li>
					<li>
						<Link ref={menRef} to="/category/men">
							Men
						</Link>
					</li>
					<li>
						<Link ref={womenRef} to="/category/women">
							Women
						</Link>
					</li>
					<li>
						<Link ref={contactUsRef} to="/contact-us">
							Contact us
						</Link>
					</li>
				</ul>
				<div className="nav__position">
					<div className="nav__dot" ref={dotRef}>
						<Dot_icon />
					</div>
				</div>
			</nav>
		</div>
	);
}
