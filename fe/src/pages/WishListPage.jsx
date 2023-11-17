import React from "react";
import Navbar from "../components/navbar/Navbar";
import Wishlist from "../components/wishlist/Wishlist";
import hunterBgImage from "../img/Pokemon2.png";
import TopBar from "../components/navbar/Topbar";

function WishlistPage() {
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

			<Wishlist />
		</div>
	);
}

export default WishlistPage;
