import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spinner, Container, Card, Row, Col } from "react-bootstrap";

function DetailsProduct() {
	const { productId } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProductDetails = async () => {
			setLoading(true);
			try {
				const response = await axios.get(
					`http://localhost:5050/products/${productId}`
				);
				setProduct(response.data);
			} catch (error) {
				console.error("Failed to fetch product details:", error);
			}
			setLoading(false);
		};

		fetchProductDetails();
	}, [productId]);

	if (loading) {
		return (
			<Container
				className="d-flex justify-content-center align-items-center"
				style={{ height: "80vh" }}
			>
				<Spinner animation="border" />
			</Container>
		);
	}

	if (!product) {
		return <Container>Nessun prodotto trovato.</Container>;
	}

	return (
		<Container className="mt-5">
			<Row>
				<Col md={6} className="d-flex align-items-stretch">
					<Card className="w-100 shadow-sm mb-1">
						<Card.Img
							variant="top"
							src={product.imageUrl}
							className="img-fluid"
							style={{ objectFit: "contain", height: "100%" }}
						/>
					</Card>
				</Col>
				<Col md={6} className="mb-1">
					<Card className="h-100 shadow-sm">
						<Card.Body>
							<Card.Title as="h1" className="TitleDetails  fw-bold">
								{product.title}
							</Card.Title>
							<hr />
							<Card.Text as="h2" className="h5">
								<strong>Descrizione:</strong>
							</Card.Text>
							<Card.Text className="DescriptionDetails text-dark fst-italic">
								{product.description}
							</Card.Text>
							<Card.Text as="h3" className="h5 fs-2">
								<strong>Prezzo:</strong>{" "}
								{new Intl.NumberFormat("it-IT", {
									style: "currency",
									currency: "EUR",
								}).format(product.price)}
							</Card.Text>

							<div className="d-flex justify-content-between align-items-center mt-4"></div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default DetailsProduct;
