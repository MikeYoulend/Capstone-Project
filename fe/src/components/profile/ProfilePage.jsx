import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Image, Alert } from "react-bootstrap";

function ProfilePage() {
	const [profileData, setProfileData] = useState({
		fullName: "",
		address: "",
		gender: "unspecified",
		phoneNumber: "",
		profileImage: "",
	});
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [selectedImage, setSelectedImage] = useState(null); // Stato per l'immagine selezionata

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				const endpoint = process.env.REACT_APP_URL_ENDPOINT;
				const token = localStorage.getItem("token");
				const response = await axios.get(`${endpoint}/auth/profile`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				// Inizializza tutti i campi, anche se non sono presenti nella risposta
				setProfileData({
					fullName: response.data.fullName || "",
					address: response.data.address || "",
					gender: response.data.gender || "unspecified",
					phoneNumber: response.data.phoneNumber || "",
					profileImage: response.data.profileImage || "",
				});
			} catch (error) {
				setError("Errore nel caricamento dei dati del profilo.");
			}
		};

		fetchProfileData();
	}, []);

	const handleInputChange = (e) => {
		setProfileData({ ...profileData, [e.target.name]: e.target.value });
	};

	const handleImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setSelectedImage(e.target.files[0]);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem("token");
			const formData = new FormData();
			Object.entries(profileData).forEach(([key, value]) => {
				formData.append(key, value);
			});
			if (selectedImage) {
				formData.append("profileImage", selectedImage);
			}
			await axios.put(
				`${process.env.REACT_APP_URL_ENDPOINT}/auth/profile`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data",
					},
				}
			);
			setMessage("Profilo aggiornato con successo!");
		} catch (error) {
			setError("Errore nell'aggiornamento del profilo.");
		}
	};

	return (
		<div className="profile-page">
			{error && <Alert variant="danger">{error}</Alert>}
			{message && <Alert variant="success">{message}</Alert>}

			<h2>Dati Profilo Attuali</h2>
			<ul>
				<li>Nome completo: {profileData.fullName}</li>
				<li>Indirizzo: {profileData.address}</li>
				<li>Genere: {profileData.gender}</li>
				<li>Telefono: {profileData.phoneNumber}</li>
				{profileData.profileImage && (
					<li>
						<Image src={profileData.profileImage} alt="Profile" thumbnail />
					</li>
				)}
			</ul>

			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="fullName">
					<Form.Label>Nome Completo</Form.Label>
					<Form.Control
						type="text"
						placeholder="Inserisci il nome completo"
						name="fullName"
						value={profileData.fullName}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group controlId="address">
					<Form.Label>Indirizzo</Form.Label>
					<Form.Control
						type="text"
						placeholder="Inserisci l'indirizzo"
						name="address"
						value={profileData.address}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group controlId="gender">
					<Form.Label>Genere</Form.Label>
					<Form.Control
						as="select"
						name="gender"
						value={profileData.gender}
						onChange={handleInputChange}
					>
						<option value="unspecified">Non specificato</option>
						<option value="male">Maschio</option>
						<option value="female">Femmina</option>
					</Form.Control>
				</Form.Group>
				<Form.Group controlId="phoneNumber">
					<Form.Label>Numero di Telefono</Form.Label>
					<Form.Control
						type="text"
						placeholder="Inserisci il numero di telefono"
						name="phoneNumber"
						value={profileData.phoneNumber}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group controlId="profileImage">
					<Form.Label>Immagine del Profilo</Form.Label>
					<Form.Control type="file" onChange={handleImageChange} />
					{profileData.profileImage && (
						<Image src={profileData.profileImage} alt="Profile" thumbnail />
					)}
				</Form.Group>
				<Button type="submit">Salva Modifiche</Button>
			</Form>
		</div>
	);
}

export default ProfilePage;
