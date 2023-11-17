import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { Button, Form, FormControl, InputGroup, Alert } from "react-bootstrap";
import { useCart } from "../Cart/useCart";

function CheckoutForm({ totalAmount, handlePaymentSuccess }) {
	const { clearCart } = useCart();
	const stripe = useStripe();
	const elements = useElements();
	const [billingDetails, setBillingDetails] = useState({
		name: "",
		email: "",
		address: "",
		city: "",
		zip: "",
	});
	const [paymentStatus, setPaymentStatus] = useState(null);

	const handleInputChange = (e) => {
		setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		const cardElement = elements.getElement(CardElement);

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: cardElement,
			billing_details: {
				name: billingDetails.name,
				email: billingDetails.email,
				address: {
					line1: billingDetails.address,
					postal_code: billingDetails.zip,
					city: billingDetails.city,
				},
			},
		});

		if (error) {
			console.log("[error]", error);
			setPaymentStatus("error");
		} else {
			try {
				const amountInCents = Math.round(totalAmount * 100);

				const paymentResult = await axios.post("http://localhost:5050/pay", {
					id: paymentMethod.id,
					amount: amountInCents,
				});

				if (paymentResult.data.success) {
					handlePaymentSuccess();
					clearCart();
					setPaymentStatus("success");
				} else {
					setPaymentStatus("error");
				}
			} catch (error) {
				console.error("Errore di pagamento:", error);
				setPaymentStatus("error");
			}
		}
	};

	return (
		<Form
			onSubmit={handleSubmit}
			className="d-flex flex-column align-items-center"
		>
			<InputGroup className="mb-3 w-75">
				<FormControl
					placeholder="Nome completo"
					name="name"
					value={billingDetails.name}
					onChange={handleInputChange}
				/>
			</InputGroup>

			<InputGroup className="mb-3 w-75">
				<FormControl
					placeholder="Email"
					name="email"
					value={billingDetails.email}
					onChange={handleInputChange}
				/>
			</InputGroup>

			<InputGroup className="mb-3 w-75">
				<FormControl
					placeholder="Città"
					name="city"
					value={billingDetails.city}
					onChange={handleInputChange}
				/>
			</InputGroup>

			<InputGroup className="mb-3 w-75">
				<FormControl
					placeholder="Indirizzo"
					name="address"
					value={billingDetails.address}
					onChange={handleInputChange}
				/>
			</InputGroup>

			<InputGroup className="mb-3 w-75">
				<FormControl
					placeholder="Codice Postale"
					name="zip"
					value={billingDetails.zip}
					onChange={handleInputChange}
				/>
			</InputGroup>

			<div className="StripeCheck mb-3">
				<CardElement className="form-control" />
			</div>

			<Button
				type="submit"
				variant="primary"
				disabled={!stripe}
				className="w-25 bg-danger border-0 fw-bold"
			>
				Paga
			</Button>

			{paymentStatus === "success" && (
				<Alert variant="success" className="mt-3">
					Pagamento avvenuto con successo!
				</Alert>
			)}
			{paymentStatus === "error" && (
				<Alert variant="danger" className="mt-3">
					Errore nel pagamento. Riprova.
				</Alert>
			)}
		</Form>
	);
}

export default CheckoutForm;
