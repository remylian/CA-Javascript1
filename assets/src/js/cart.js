import { updateCartCount, getCartItems, clearCart, removeFromCart } from './cartService.mjs';

document.addEventListener('DOMContentLoaded', () => {
	renderCartItems();
	setupEmptyCartButton();
	setupRemoveCartItemListener();
});

// function to render cart items
function renderCartItems() {
	const cartItems = getCartItems();
	const cartItemsContainer = document.getElementById('cart-items-container');
	const cartItemTemplate = document.getElementById('cart-item-template').content;

	// clear current items in cart
	cartItemsContainer.innerHTML = '';

	if (cartItems.length === 0) {
		// show the empty cart message if the cart is empty
		document.getElementById('empty-cart-message').style.display = 'block';
	} else {
		// hide the empty cart message if there are items
		document.getElementById('empty-cart-message').style.display = 'none';

		// iterate over items and add them to the cart
		cartItems.forEach((item) => {
			const cartItem = cartItemTemplate.cloneNode(true);

			// Set product details
			cartItem.querySelector('.product-name').textContent = item.title;
			cartItem.querySelector('.product-price').textContent = `$${item.price.toFixed(2)}`;
			cartItem.querySelector('.product-image').src = item.image.url || '';
			cartItem.querySelector('.product-image').alt = item.image.alt || 'Product image';

			cartItem.querySelector('.remove-cart-item-button').dataset.productId = item.id;

			cartItemsContainer.appendChild(cartItem);
		});

		updateTotalCost(cartItems);
	}

	updateCartCount();
}

// function to setup the empty cart button
function setupEmptyCartButton() {
	const emptyCartButton = document.getElementById('empty-cart-btn');
	emptyCartButton.addEventListener('click', () => {
		clearCart();
		renderCartItems();
		updateTotalCost([]);
	});
}

// function to update the total cost
function updateTotalCost(cartItems) {
	const totalCostElement = document.getElementById('cart-total').querySelector('.total-price');
	const totalCost = cartItems.reduce((total, item) => total + item.price, 0);
	totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
}

// function to remove an item and update cart when remove from cart button is clicked
function setupRemoveCartItemListener() {
	const cartContainer = document.getElementById('cart-items-container');

	cartContainer.addEventListener('click', (event) => {
		if (event.target.classList.contains('remove-cart-item-button')) {
			const productId = event.target.dataset.productId;

			removeFromCart(productId);

			renderCartItems();
			updateTotalCost(getCartItems());
			updateCartCount();
		}
	});
}
