import React from "react";
import { useCart } from "../Cart/useCart";
import { Card, Col, Container, Row } from "react-bootstrap";
import "../../App.css";
import { useNavigate } from "react-router-dom";
function Product({ product }) {
	const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useCart();

	const isInWishlist = wishlist.some((item) => item._id === product._id);
	const navigate = useNavigate();

	const formattedPrice = new Intl.NumberFormat("it-IT", {
		style: "currency",
		currency: "EUR",
	}).format(product.price);

	const toggleWishlist = () => {
		if (isInWishlist) {
			removeFromWishlist(product._id);
		} else {
			addToWishlist(product);
		}
	};

	const goToDetails = () => {
		navigate(`/product/${product._id}`);
	};

	return (
		<Container fluid className="">
			<Row className="justify-content-center">
				<Col className="p-0">
					<Card className=" mb-4 shadow product-card border-0 bg-dark p-1">
						<div className="product-image-container" onClick={goToDetails}>
							<img
								src={product.imageUrl}
								alt={product.title}
								className="product-card-img"
							/>
							<div className="product-hover-overlay">Dettagli</div>
						</div>
						<Card.Body className="bg-UnderCard rounded-bottom bg-dark p-2">
							<Card.Title className="colorText d-flex  justify-content-center  ju p-2 text-align-center">
								{product.title}
							</Card.Title>

							<div className="d-flex justify-content-around align-items-center">
								<a
									href="#"
									onClick={(e) => {
										e.preventDefault();
										addToCart(product);
									}}
									className="btn-flip mt-2 p-0"
									data-back="Add"
									data-front="🛒"
								></a>
								<button
									onClick={toggleWishlist}
									className={`wishlist-btn ${isInWishlist ? "active" : ""}`}
								>
									♡
								</button>
								<strong className="price">{formattedPrice}</strong>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default Product;
