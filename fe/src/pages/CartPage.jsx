import React from "react";
import Navbar from "../components/navbar/Navbar";
import Cart from "../components/Cart/Cart";
import hunterBgImage from "../img/Pokemon2.png";
import TopBar from "../components/navbar/Topbar";
const CartPage = () => {
	return (
		<div
			style={{
				backgroundImage: `url(${hunterBgImage})`,
				backgroundRepeat: "repeat",
				backgroundSize: "contain",
				backgroundAttachment: "fixed",
				minHeight: "100vh",
			}}
		>
			<TopBar />
			<Navbar showSearchBar={false} />
			<Cart />
		</div>
	);
};

export default CartPage;
