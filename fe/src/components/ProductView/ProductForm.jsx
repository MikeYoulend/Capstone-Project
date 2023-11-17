import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductForm() {
	const [allProducts, setAllProducts] = useState([]);
	const [selectedImage, setSelectedImage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);
	const [showReloadMessage, setShowReloadMessage] = useState(false);
	const [productData, setProductData] = useState({
		title: "",
		imageUrl: "",
		description: "",
		price: 0,
		category: "collezioni",
		subcategory: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProductData((prev) => ({ ...prev, [name]: value }));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setSelectedImage(file);
	};

	const handleEdit = (product) => {
		setProductData(product);
		setEditingProduct(product);
		setSelectedImage(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		let endpoint = "http://localhost:5050/products";
		let method = "POST";

		if (editingProduct) {
			endpoint += `/${editingProduct._id}`;
			method = "PUT";
		}

		try {
			let imageUrl = productData.imageUrl;
			if (selectedImage) {
				const formData = new FormData();
				formData.append("image", selectedImage);
				const imageResponse = await axios.post(
					"http://localhost:5050/upload",
					formData
				);
				imageUrl = imageResponse.data.imageUrl;
			}

			await axios({
				url: endpoint,
				method: method,
				data: {
					...productData,
					imageUrl: imageUrl,
				},
			});

			const response = await axios.get("http://localhost:5050/products");
			setAllProducts(response.data);

			setShowReloadMessage(true);

			setProductData({
				title: "",
				description: "",
				imageUrl: "",
				price: 0,
				category: "collezioni",
				subcategory: "",
			});
			setEditingProduct(null);
			setSelectedImage(null);
		} catch (error) {
			console.error("Errore durante l'operazione sul prodotto:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:5050/products/${id}`);
			setAllProducts(allProducts.filter((product) => product._id !== id));
		} catch (error) {
			console.error("Errore durante l'eliminazione del prodotto:", error);
		}
	};

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get("http://localhost:5050/products");
				setAllProducts(response.data);
			} catch (error) {
				console.error("Errore durante il recupero dei prodotti:", error);
			}
		};
		fetchProducts();
	}, []);

	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						Titolo:
					</label>
					<input
						type="text"
						id="title"
						name="title"
						value={productData.title}
						onChange={handleChange}
						className="form-control"
						required
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="category" className="form-label">
						Categoria:
					</label>
					<select
						id="category"
						name="category"
						value={productData.category}
						onChange={handleChange}
						className="form-control"
						required
					>
						<option value="collezioni">Collezioni</option>
						<option value="manga">Manga</option>
						<option value="statuine">Statuine</option>
					</select>
				</div>

				<div className="mb-3">
					<label htmlFor="subcategory" className="form-label">
						Sottocategoria:
					</label>
					<select
						id="subcategory"
						name="subcategory"
						value={productData.subcategory}
						onChange={handleChange}
						className="form-control"
					>
						<option value="">Nessuna</option>{" "}
						<option value="Pokemon">Pokemon</option>
						<option value="Yugiho">Yugiho</option>
						<option value="one piece">One Piece</option>
						<option value="dragonball">Dragonball</option>
					</select>
				</div>

				<div className="mb-3">
					<label htmlFor="image" className="form-label">
						Immagine:
					</label>
					<input
						type="file"
						id="image"
						onChange={handleImageChange}
						className="form-control"
					/>
					{productData.imageUrl && (
						<div className="mt-2">
							<img src={productData.imageUrl} alt="Preview" width="100" />
							{editingProduct && (
								<p className="text-muted">
									Carica una nuova immagine per sostituire quella attuale.
								</p>
							)}
						</div>
					)}
				</div>

				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Descrizione:
					</label>
					<textarea
						id="description"
						name="description"
						value={productData.description}
						onChange={handleChange}
						className="form-control"
						required
					></textarea>
				</div>

				<div className="mb-3">
					<label htmlFor="price" className="form-label">
						Prezzo:
					</label>
					<input
						type="number"
						id="price"
						name="price"
						value={productData.price}
						onChange={handleChange}
						className="form-control"
						required
					/>
				</div>

				<button type="submit" className="btn btn-primary" disabled={isLoading}>
					{isLoading
						? "Loading..."
						: editingProduct
						? "Modifica Prodotto"
						: "Aggiungi Prodotto"}
				</button>
			</form>

			{showReloadMessage && (
				<div className="alert alert-info mt-4">
					Ricarica la pagina per vedere le modifiche ai prodotti.
				</div>
			)}

			<div className="mt-5">
				<h3>Elenco prodotti</h3>
				<ul className="list-group">
					{allProducts.map((product, index) => (
						<li
							key={`form-${product._id || index}`}
							className="list-group-item d-flex justify-content-between align-items-center"
						>
							{product.title}
							<div>
								<button
									className="btn btn-info btn-sm mr-2"
									onClick={() => handleEdit(product)}
								>
									Modifica
								</button>
								<button
									className="btn btn-danger btn-sm"
									onClick={() => handleDelete(product._id)}
								>
									Elimina
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
export default ProductForm;
