import React from "react";
import { useCart } from "../Cart/useCart";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Wishlist() {
	const { wishlist, removeFromWishlist } = useCart();

	if (wishlist.length === 0) {
		return (
			<Container className="text-center mt-5">
				<h2 className="fw-bold fs-1">La tua Lista dei Desideri è vuota.</h2>
			</Container>
		);
	}

	return (
		<Container className="mt-5">
			<h2 className="text-center mb-4 fw-bold">La tua Lista dei Desideri</h2>
			<Row xs={1} md={2} lg={3} className="g-4">
				{wishlist.map((product) => (
					<Col key={product._id} className="d-flex align-items-stretch ">
						<Card className="w-100 shadow-sm mb-4 bg-dark p-2 text-white fw-bold ">
							<Card.Img
								variant="top"
								src={product.imageUrl}
								alt={product.title}
								className="w-100 BgWishlist "
								style={{ objectFit: "contain", height: "300px" }}
							/>
							<Card.Body className="  d-flex flex-column">
								<Card.Title className=" p-2 fs-3 fw-bold">
									{product.title}
								</Card.Title>

								<Card.Text className="mb-2 fs-2">
									Prezzo: {product.price}€
								</Card.Text>
								<div className="d-flex justify-content-center align-items-center mt-auto">
									<Button
										variant="outline-danger"
										onClick={() => removeFromWishlist(product._id)}
										className="me-2"
									>
										Rimuovi
									</Button>
									<Link
										to={`/product/${product._id}`}
										className="btn btn-primary"
									>
										Dettagli Prodotto
									</Link>
								</div>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default Wishlist;
