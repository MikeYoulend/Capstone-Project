import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import Product from "./Product";
import CategoriesBar from "../navbar/CategoriesBar";

function ProductsList({ searchQuery }) {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedSubcategory, setSelectedSubcategory] = useState("");

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(`http://localhost:5050/products`, {
					params: {
						category: selectedCategory,
						subcategory: selectedSubcategory,
					},
				});
				setProducts(response.data);
				setIsLoading(false);
			} catch (error) {
				console.error("Errore durante il recupero dei prodotti:", error);
				setIsLoading(false);
			}
		};

		fetchProducts();
	}, [selectedCategory, selectedSubcategory]);

	const handleSelectCategory = (category) => {
		setSelectedCategory(category);
		setSelectedSubcategory("");
	};

	const handleSelectSubcategory = (subcategory) => {
		setSelectedSubcategory(subcategory);
	};

	if (isLoading) {
		return (
			<Container
				className="d-flex justify-content-center align-items-center"
				style={{ minHeight: "100vh" }}
			>
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Caricamento...</span>
				</Spinner>
			</Container>
		);
	}

	if (!products || products.length === 0) {
		return (
			<Container className="text-center mt-5">
				<h2>Nessun prodotto disponibile al momento.</h2>
			</Container>
		);
	}

	const filteredProducts = products.filter((product) => {
		const matchesCategory =
			selectedCategory === "" || product.category === selectedCategory;
		const matchesSubcategory =
			selectedSubcategory === "" || product.subcategory === selectedSubcategory;
		const matchesSearchQuery =
			!searchQuery ||
			product.title.toLowerCase().includes(searchQuery.toLowerCase());

		return matchesCategory && matchesSubcategory && matchesSearchQuery;
	});

	return (
		<Container fluid className="HomeBg p-0">
			<CategoriesBar
				onSelectCategory={handleSelectCategory}
				onSelectSubcategory={handleSelectSubcategory}
			/>
			<Row className="mx-0">
				{filteredProducts.map((product) => (
					<Col
						key={product._id}
						xl={3}
						lg={3}
						md={4}
						sm={6}
						xs={6}
						className="mb-4 px-2"
					>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default ProductsList;
