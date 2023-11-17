import React from "react";
import Login from "../components/Login/Login";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const LoginPage = () => {
	return (
		<Container className="my-5">
			<h1 className="text-center mb-4">Accedi al tuo account</h1>
			<Login />
			<div className="text-center mt-4">
				<Link to="/register">
					<Button variant="outline-primary">Registrati</Button>
				</Link>
				<Link to="/" className="m-2">
					<Button variant="outline-secondary m-2">
						Continua senza registrarti
					</Button>
				</Link>
			</div>
		</Container>
	);
};

export default LoginPage;
