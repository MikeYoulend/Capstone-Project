import React from "react";
import Register from "../components/Register";
import hunterBgImage from "../img/Pokemon2.png";

const RegisterPage = () => {
	return (
		<div
			style={{
				backgroundImage: `url(${hunterBgImage})`,
				backgroundRepeat: "repeat",
				backgroundSize: "contain",
				backgroundAttachment: "fixed",
				minHeight: "100vh",
			}}
		>
			<Register />
		</div>
	);
};

export default RegisterPage;
