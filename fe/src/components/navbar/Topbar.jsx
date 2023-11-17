import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

function TopBar() {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsLoggedIn(!!token);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
		navigate(0);
	};

	return (
		<div className="top-bar">
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} className="text-center">
						{!isLoggedIn && (
							<Link to="/login" className="top-bar-link">
								Accedi
							</Link>
						)}
						{!isLoggedIn && (
							<Link to="/register" className="top-bar-link">
								Registrati
							</Link>
						)}
						{isLoggedIn && (
							<button
								onClick={handleLogout}
								className="top-bar-link btn btn-link"
							>
								Logout
							</button>
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default TopBar;
