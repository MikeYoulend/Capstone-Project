import { useState } from "react";
import { useCart } from "../Cart/useCart";
import { Link } from "react-router-dom";
import shoppingCartImg from "../../img/shopping-cart.png";
import wishListImg from "../../img/wishlist.png";
import { Container } from "react-bootstrap";
import "../../App.css";

function Navbar({ onSearch, showSearchBar = true }) {
	const { cart, wishlist } = useCart();
	const [search, setSearch] = useState("");
	const totalItemsInCart = cart.reduce(
		(total, cartItem) => total + cartItem.quantity,
		0
	);

	const handleSearchClick = () => {
		onSearch(search);
	};

	return (
		<div className="navbar navbar-dark bg-dark ">
			<Container fluid>
				<div className="container d-flex justify-content-between align-items-center ">
					<Link to="/">
						<div className="units ">
							<div>Gon's House</div>
							<div></div>
						</div>
					</Link>
					{showSearchBar && (
						<div className="mobile-search d-flex align-items-center">
							<input
								type="text"
								className="form-control me-2"
								placeholder="Cerca..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<button className="btn btn-light " onClick={handleSearchClick}>
								Ricerca
							</button>
						</div>
					)}
					<div className=" d-flex align-items-stretch ">
						<Link to="/wishlist" className="d-flex align-items-center">
							<img src={wishListImg} alt="Wishlist" className="Wishlist" />
							<span className="text-warning notification-badge first-badge ">
								{wishlist.length}
							</span>
						</Link>
						<Link to="/cart" className="d-flex align-items-center  ">
							<img
								src={shoppingCartImg}
								alt="Shopping Cart"
								className="me-2 Cart"
							/>
							<span className="text-warning notification-badge second-badge">
								{totalItemsInCart}
							</span>
						</Link>
					</div>
				</div>
			</Container>
		</div>
	);
}

export default Navbar;
