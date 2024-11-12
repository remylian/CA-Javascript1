// cartService.mjs

// function to get items from the cart in local storage
export function getCartItems() {
	const cart = localStorage.getItem('cart');
	return cart ? JSON.parse(cart) : [];
}

// function to add an item to the cart
export function addItemToCart(item) {
	const cart = getCartItems();
	cart.push(item);
	localStorage.setItem('cart', JSON.stringify(cart));
}

// function to clear the cart
export function clearCart() {
	localStorage.removeItem('cart');
}

// function to update cart count elements
export function updateCartCount() {
	const cartItems = getCartItems();
	const totalItems = cartItems.length;

	// get all elements with 'cart-count' class
	const cartCountElements = document.getElementsByClassName('cart-count');
	for (let cartCountElement of cartCountElements) {
		cartCountElement.textContent = totalItems;
	}
}
