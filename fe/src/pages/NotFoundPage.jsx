import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<div className="text-center mt-5">
			<h2>Errore 404: Pagina Non Trovata</h2>
			<p>Sembra che la pagina che stai cercando non esista.</p>
			<Link to="/">Torna alla Homepage</Link>
		</div>
	);
};

export default NotFoundPage;
