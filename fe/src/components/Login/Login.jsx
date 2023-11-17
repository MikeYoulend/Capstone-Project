import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const Login = () => {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:5050/auth/login",
				credentials
			);
			localStorage.setItem("token", response.data.token);
			navigate("/");
		} catch (error) {
			if (error.response) {
				setError(error.response.data.message);
			} else {
				setError("Login fallito. Controlla le tue credenziali.");
			}
		}
	};

	return (
		<>
			{error && <Alert variant="danger">{error}</Alert>}
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Inserisci email"
						name="email"
						value={credentials.email}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group controlId="password" className="mt-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Inserisci password"
						name="password"
						value={credentials.password}
						onChange={handleChange}
					/>
				</Form.Group>
				<Button variant="primary" type="submit" className="mt-3">
					Accedi
				</Button>
			</Form>
		</>
	);
};

export default Login;
