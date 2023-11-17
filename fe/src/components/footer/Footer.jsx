import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => (
	<footer className="Footer bg-dark text-white p-4 ">
		<Container fluid>
			<div className="row ">
				<div className="container">
					<div className="row">
						<div className="col-md-3">
							<h5>Gon's House</h5>
							<ul className="list-unstyled">
								<li className="te">
									<a href="#" className="text-white text-decoration-none">
										Chi siamo
									</a>
								</li>
								<li>
									<a href="#" className="text-white text-decoration-none">
										Lavora con noi
									</a>
								</li>
								<li>
									<a href="#" className="text-white text-decoration-none">
										Termini di servizio
									</a>
								</li>
								<li>
									<a href="#" className="text-white text-decoration-none">
										Privacy
									</a>
								</li>
							</ul>
						</div>
						<div className="col-md-3">
							<h5>Supporto</h5>
							<ul className="list-unstyled">
								<li>
									<a href="#" className="text-white text-decoration-none">
										Centro assistenza
									</a>
								</li>
								<li>
									<a href="#" className="text-white text-decoration-none">
										Contatti
									</a>
								</li>
								<li>
									<a href="#" className="text-white text-decoration-none">
										FAQ
									</a>
								</li>
							</ul>
						</div>
						<div className="col-md-3">
							<h5>Seguici</h5>
							<ul className="list-unstyled">
								<li>
									<a href="#" className="text-white text-decoration-none">
										Facebook
									</a>
								</li>
								<li>
									<a href="#" className="text-white text-decoration-none">
										Instagram
									</a>
								</li>
								<li>
									<a href="#" className="text-white text-decoration-none">
										Twitter
									</a>
								</li>
							</ul>
						</div>
						<div className="col-md-3">
							<h5>Contatti</h5>
							<address>
								Via delle Arti, 123
								<br />
								20019 Milano, Italia
								<br />
								info@gonshouse.it
							</address>
						</div>
					</div>
				</div>
				<div className="text-center pb-4 mt-5">
					&copy; {new Date().getFullYear()} Marketplace. Tutti i diritti
					riservati.
				</div>
			</div>
		</Container>
	</footer>
);

export default Footer;
