import { updateCartCount, getCartItems, clearCart } from './cartService.mjs';

document.addEventListener('DOMContentLoaded', () => {
	renderCartItems();
	setupEmptyCartButton();
});

// Function to render cart items
function renderCartItems() {
	const cartItems = getCartItems();
	const cartItemsContainer = document.getElementById('cart-items-container');
	const cartItemTemplate = document.getElementById('cart-item-template').content;

	// Clear current items in cart
	cartItemsContainer.innerHTML = '';

	if (cartItems.length === 0) {
		// Show the empty cart message if the cart is empty
		document.getElementById('empty-cart-message').style.display = 'block';
	} else {
		// Hide the empty cart message if there are items
		document.getElementById('empty-cart-message').style.display = 'none';

		// Iterate over items and add them to the cart
		cartItems.forEach((item) => {
			const cartItem = cartItemTemplate.cloneNode(true);

			// Set product name, price, and image
			cartItem.querySelector('.product-name').textContent = item.title;
			cartItem.querySelector('.product-price').textContent = `$${item.price.toFixed(2)}`;
			cartItem.querySelector('.product-image').src = item.image.url || '';
			cartItem.querySelector('.product-image').alt = item.image.alt || 'Product image';

			// Append cart item to container
			cartItemsContainer.appendChild(cartItem);
		});

		// Update the total cost
		updateTotalCost(cartItems);
	}

	// Update cart count
	updateCartCount();
}

// Function to setup the empty cart button
function setupEmptyCartButton() {
	const emptyCartButton = document.getElementById('empty-cart-btn');
	emptyCartButton.addEventListener('click', () => {
		clearCart();
		renderCartItems();
		updateCartCount();
	});
}

// Function to update the total cost
function updateTotalCost(cartItems) {
	const totalCostElement = document.getElementById('cart-total').querySelector('.total-price');
	const totalCost = cartItems.reduce((total, item) => total + item.price, 0);
	totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
}
