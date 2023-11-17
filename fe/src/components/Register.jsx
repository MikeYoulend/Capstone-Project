import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Register() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [message, setMessage] = useState("");
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onRegisterSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:5050/auth/register",
				formData
			);
			setMessage("Registrazione avvenuta con successo!");
			setErrors({});
			navigate("/login");
		} catch (error) {
			if (error.response && error.response.data) {
				setErrors(error.response.data.errors || {});
				setMessage(
					error.response.data.message || "Errore durante la registrazione."
				);
			} else {
				setMessage("Errore di connessione al server.");
			}
		}
	};

	const handleGoToLogin = () => {
		navigate("/login");
	};

	const handleContinueWithoutRegister = () => {
		navigate("/");
	};

	return (
		<div className="d-flex justify-content-center align-items-center min-vh-100 ">
			<Container>
				<Row className="justify-content-center ">
					<Col lg={6} md={8} sm={10} className="BgRegister rounded w-75">
						<h2 className="text-center my-4 text-white fs-1 fw-bold">
							Registrati
						</h2>
						<Form onSubmit={onRegisterSubmit}>
							<Form.Group controlId="formBasicUsername">
								<Form.Label className="fs-2 fw-bold text-white">
									Username
								</Form.Label>
								<Form.Control
									type="text"
									placeholder="Inserisci username"
									name="username"
									value={formData.username}
									onChange={onChange}
									isInvalid={!!errors.username}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.username}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group controlId="formBasicEmail">
								<Form.Label className="fs-2 fw-bold text-white">
									Email
								</Form.Label>
								<Form.Control
									type="email"
									placeholder="Inserisci email"
									name="email"
									value={formData.email}
									onChange={onChange}
									isInvalid={!!errors.email}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.email}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group controlId="formBasicPassword">
								<Form.Label className="fs-2 fw-bold text-white">
									Password
								</Form.Label>
								<Form.Control
									type="password"
									placeholder="Inserisci password"
									name="password"
									value={formData.password}
									onChange={onChange}
									isInvalid={!!errors.password}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.password}
								</Form.Control.Feedback>
							</Form.Group>

							<div className="d-flex justify-content-center">
								<Button
									variant="btn btn-outline-light"
									type="submit"
									className="mt-3 mb-3 w-50 p-2 fw-bold "
								>
									Registrati
								</Button>
							</div>
						</Form>
						<div className="d-flex flex-column flex-md-row justify-content-around mb-3">
							<Button
								variant="btn btn-outline-light"
								onClick={handleGoToLogin}
								className="mt-2"
							>
								Vai al Login
							</Button>
							<Button
								variant="btn btn-outline-light mt-2"
								onClick={handleContinueWithoutRegister}
							>
								Continua Senza Registrarti
							</Button>
						</div>
						{message && (
							<Alert variant={errors ? "danger" : "success"} className="mt-3">
								{message}
							</Alert>
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Register;
