import { handleError } from './errorHandler.mjs';
import { addItemToCart, updateCartCount } from './cartService.mjs';

async function fetchProductById(productId) {
	try {
		const response = await fetch(`https://v2.api.noroff.dev/rainy-days/${productId}`);
		if (!response.ok) {
			throw new Error('Failed to fetch product details');
		}
		const product = await response.json();
		return product.data;
	} catch (error) {
		console.error('An error occurred while fetching product details', error);
		return undefined;
	}
}

function getProductIdFromUrl() {
	const params = new URLSearchParams(window.location.search);
	return params.get('id');
}

function renderProductDetails(product) {
	if (!product) {
		document.getElementById('product-details').innerHTML = '<p>product not found</p>';
		return;
	}
	document.getElementById('product-image').src = product.image?.url || '';
	document.getElementById('product-image').alt = product.image?.alt || 'Product image';
	document.getElementById('product-title').textContent = product.title;
	document.getElementById('product-description').textContent = product.description;
	document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
	document.getElementById('product-sizes').textContent = product.sizes?.join(', ') || 'N/A';

	document.getElementById('add-to-cart').addEventListener('click', () => {
		addItemToCart(product);
		alert('Great choice! Product added to cart');
	});
}

document.addEventListener('DOMContentLoaded', async () => {
	updateCartCount();
	const productId = getProductIdFromUrl();
	if (!productId) {
		console.error('Product ID could not be found in URL');
		renderProductDetails(null);
		return;
	}

	const product = await handleError(() => fetchProductById(productId), {
		errorMessageElement: document.getElementById('error-message'),
		loadingSpinnerElement: document.getElementById('loading'),
	});

	renderProductDetails(product);
});
