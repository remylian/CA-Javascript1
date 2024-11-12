import { fetchProducts } from './productService.mjs';
import { renderProducts } from './displayProducts.mjs';
import { addFilterListener } from './filter.mjs';
import { handleError } from './errorHandler.mjs';
import { updateCartCount } from './cartService.mjs';

document.addEventListener('DOMContentLoaded', async () => {
	updateCartCount();

	try {
		const products = await handleError(fetchProducts, {
			errorMessageElement: document.getElementById('error-message'),
			loadingSpinnerElement: document.getElementById('loading'),
		});

		if (products) {
			renderProducts(products);
			addFilterListener(products, renderProducts);
		}
	} catch (error) {
		console.error('An error occurred during initialization:', error);
	}
});
