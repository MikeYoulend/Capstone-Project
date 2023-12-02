import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

function TopBar() {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		const savedUsername = localStorage.getItem("username");
		setIsLoggedIn(!!token);
		setUsername(savedUsername || ""); // Se non c'è uno username, imposta una stringa vuota
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		setIsLoggedIn(false);
		setUsername("");
		navigate(0); // Ricarica la pagina
	};

	return (
		<div className="top-bar">
			<Container>
				<Row className="justify-content-center">
					<Col
						xs={12}
						className="text-center d-flex align-items-center justify-content-center"
					>
						{!isLoggedIn && (
							<Link to="/login" className="top-bar-link mx-2">
								Accedi
							</Link>
						)}
						{!isLoggedIn && (
							<Link to="/register" className="top-bar-link mx-2">
								Registrati
							</Link>
						)}
						{isLoggedIn && (
							<>
								<span className="top-bar-link cursor-pointer text-danger mx-2">
									{username}
								</span>
								<button
									onClick={handleLogout}
									className="top-bar-link btn btn-link mx-2"
								>
									Logout
								</button>
							</>
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default TopBar;
