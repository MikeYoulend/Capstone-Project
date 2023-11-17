import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
	return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState(() => {
		const savedCart = localStorage.getItem("cart");
		return savedCart ? JSON.parse(savedCart) : [];
	});

	const [wishlist, setWishlist] = useState(() => {
		const savedWishlist = localStorage.getItem("wishlist");
		return savedWishlist ? JSON.parse(savedWishlist) : [];
	});

	const addToWishlist = (product) => {
		if (!wishlist.find((item) => item._id === product._id)) {
			setWishlist([...wishlist, product]);
		}
	};

	const removeFromWishlist = (productId) => {
		setWishlist(wishlist.filter((item) => item._id !== productId));
	};

	const addToCart = (product) => {
		const productInCart = cart.find((item) => item.product._id === product._id);
		if (productInCart) {
			setCart(
				cart.map((item) =>
					item.product._id === product._id
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
			);
		} else {
			setCart([...cart, { product, quantity: 1 }]);
		}
	};

	const removeFromCart = (productId) => {
		setCart(cart.filter((item) => item.product._id !== productId));
	};

	const clearCart = () => {
		setCart([]);
	};

	const updateQuantity = (productId, newQuantity) => {
		setCart(
			cart.map((item) =>
				item.product._id === productId
					? { ...item, quantity: newQuantity }
					: item
			)
		);
	};

	useEffect(() => {
		localStorage.setItem("wishlist", JSON.stringify(wishlist));
	}, [wishlist]);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				updateQuantity,
				wishlist,
				addToWishlist,
				removeFromWishlist,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
