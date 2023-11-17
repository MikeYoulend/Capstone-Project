import React, { useState } from "react";
import { useCart } from "../Cart/useCart";
import {
	Card,
	ListGroup,
	ListGroupItem,
	Button,
	Row,
	Col,
	Container,
	Image,
	Form,
	Modal,
} from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Checkout/CheckoutForm";
const stripePromise = loadStripe(
	"pk_test_51OAvslKLKVP5aWLBaGI7CwpdPF0fQGXIJnNB2pheyRR5JciFiINezgcn9FzWUEuukVpDAV5nBkiXeWkzlqWv4MjM00T1xxJxRP"
);

function Cart() {
	const { cart, removeFromCart, updateQuantity } = useCart();
	const [showModal, setShowModal] = useState(false);

	const handlePaymentSuccess = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const calculateTotal = () => {
		return cart
			.reduce((total, item) => total + item.quantity * item.product.price, 0)
			.toFixed(2);
	};

	const totalAmount = calculateTotal() * 100;

	return (
		<Container>
			<h2 className="mt-4 mb-4 text-center fw-bold text-dark fs-1">
				Il tuo carrello
			</h2>
			{cart.length > 0 ? (
				<>
					<ListGroup>
						{cart.map(({ product, quantity }) => (
							<ListGroupItem
								key={product._id}
								className="mb-3 bg-dark border-0  rounded"
							>
								<Row className="align-items-center">
									<Col xs={12} md={3}>
										<Image
											src={product.imageUrl}
											alt={product.title}
											fluid
											rounded
											className="rounded border"
										/>
									</Col>
									<Col xs={12} md={9}>
										<Card>
											<Card.Body className="bg-dark text-white">
												<Card.Title>{product.title}</Card.Title>
												<Card.Text className="fw-bold">
													Prezzo unitario: {product.price}€
												</Card.Text>
												<Card.Text className="fw-bold">
													Subtotale: {(product.price * quantity).toFixed(2)}€
												</Card.Text>
												<Form.Group
													as={Row}
													className="align-items-center my-3 fw-bold"
												>
													<Form.Label column sm={3}>
														Quantità:
													</Form.Label>
													<Col sm={9}>
														<Form.Control
															type="number"
															value={quantity}
															onChange={(e) =>
																updateQuantity(
																	product._id,
																	parseInt(e.target.value) || 0
																)
															}
															min="1"
														/>
													</Col>
												</Form.Group>
												<Button
													variant="danger fw-bold"
													onClick={() => removeFromCart(product._id)}
												>
													Rimuovi
												</Button>
											</Card.Body>
										</Card>
									</Col>
								</Row>
							</ListGroupItem>
						))}
						<div className="text-center mb-4 bg-dark m-3 p-3 rounded">
							<h3 className=" w-100 text-white ">
								Totale: €{calculateTotal()}
							</h3>
							<Elements stripe={stripePromise}>
								<CheckoutForm
									totalAmount={totalAmount}
									handlePaymentSuccess={handlePaymentSuccess}
								/>
							</Elements>
						</div>
					</ListGroup>
				</>
			) : (
				<p className="text-center text-dark fs-1 fw-bold ">
					Il tuo carrello è vuoto.
				</p>
			)}
			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>Pagamento Completato</Modal.Title>
				</Modal.Header>
				<Modal.Body>Il pagamento è stato effettuato con successo!</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleCloseModal}>
						Chiudi
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}

export default Cart;
