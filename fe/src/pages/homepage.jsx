import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import ProductsList from "../components/ProductView/ProductList";
import { Container } from "react-bootstrap";
import hunterBgImage from "../img/Pokemon2.png";
import TopBar from "../components/navbar/Topbar";

const Homepage = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	return (
		<Container
			fluid
			className="p-0"
			style={{
				backgroundImage: `url(${hunterBgImage})`,
				backgroundRepeat: "repeat",
				backgroundSize: "contain",
				backgroundAttachment: "fixed",
				minHeight: "100vh",
			}}
		>
			<TopBar />
			<Navbar onSearch={handleSearch} />
			<ProductsList searchQuery={searchQuery} />
		</Container>
	);
};

export default Homepage;
