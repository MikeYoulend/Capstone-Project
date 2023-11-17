import React from "react";
import Navbar from "../components/navbar/Navbar";

import hunterBgImage from "../img/Pokemon2.png";
import DetailsProduct from "../components/ProductView/DetailsProduct";

const DetailsProductPage = () => {
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
			<Navbar showSearchBar={false} />
			<DetailsProduct />
		</div>
	);
};

export default DetailsProductPage;
