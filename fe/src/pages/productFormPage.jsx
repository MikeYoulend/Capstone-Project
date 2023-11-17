import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import ProductForm from "../components/ProductView/ProductForm";

function ProductFormPage() {
	return (
		<div className="product-form-page">
			<Navbar expand="lg" className="bg-body-tertiary ">
				<Container>
					<Navbar.Brand href="#home" className="fs-2">
						Admin
					</Navbar.Brand>
					<Nav className="me-auto fw-bold mt-2 ">
						<Nav.Link href="/">Homepage</Nav.Link>
					</Nav>
				</Container>
			</Navbar>

			<div className="container-fluid px-0 mb-5">
				<ProductForm />
			</div>
		</div>
	);
}

export default ProductFormPage;
