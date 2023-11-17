import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/registerPage";
import Homepage from "./pages/homepage";
import ProductFormPage from "./pages/productFormPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishListPage";
import DetailsProductPage from "./pages/DetailsProductPage";
import LoginPage from "./pages/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./components/Cart/useCart";
import Footer from "./components/footer/Footer";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
	return (
		<CartProvider>
			<Router>
				<div id="page-container">
					<main>
						<Routes>
							<Route path="/register" element={<RegisterPage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/" element={<Homepage />} />
							<Route path="/cart" element={<CartPage />} />
							<Route path="/wishlist" element={<WishlistPage />} />
							<Route path="/add-product" element={<ProductFormPage />} />
							<Route
								path="/product/:productId"
								element={<DetailsProductPage />}
							/>
							<Route path="*" element={<NotFoundPage />} />
						</Routes>
					</main>
					<Footer />
				</div>
			</Router>
		</CartProvider>
	);
}

export default App;
