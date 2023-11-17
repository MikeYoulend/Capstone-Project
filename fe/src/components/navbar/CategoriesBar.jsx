import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

function CategoriesBar({ onSelectCategory, onSelectSubcategory }) {
	return (
		<Container fluid className="p-0 mb-3">
			<Navbar bg="light" expand="lg" className="justify-content-center">
				<Nav className="flex-row">
					<NavDropdown
						title="Collezioni"
						id="navbarScrollingDropdown"
						className="m-1"
					>
						<NavDropdown.Item
							onClick={() => {
								onSelectCategory("collezioni");
								onSelectSubcategory("");
							}}
						>
							Tutte le Collezioni
						</NavDropdown.Item>
						<NavDropdown.Item
							onClick={() => {
								onSelectCategory("collezioni");
								onSelectSubcategory("Pokemon");
							}}
						>
							Pokemon
						</NavDropdown.Item>
						<NavDropdown.Item
							onClick={() => {
								onSelectCategory("collezioni");
								onSelectSubcategory("Yugiho");
							}}
						>
							Yugiho
						</NavDropdown.Item>
					</NavDropdown>

					<NavDropdown
						title="Manga"
						id="navbarScrollingDropdown"
						className="m-1"
					>
						<NavDropdown.Item
							onClick={() => {
								onSelectCategory("manga");
								onSelectSubcategory("");
							}}
						>
							Tutti i Manga
						</NavDropdown.Item>
						<NavDropdown.Item
							onClick={() => {
								onSelectCategory("manga");
								onSelectSubcategory("one piece");
							}}
						>
							One Piece
						</NavDropdown.Item>
						<NavDropdown.Item
							onClick={() => {
								onSelectCategory("manga");
								onSelectSubcategory("dragonball");
							}}
						>
							Dragonball
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Navbar>
		</Container>
	);
}

export default CategoriesBar;
