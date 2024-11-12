import { addItemToCart } from './cartService.mjs';

export function renderProducts(products) {
	const productList = document.getElementById('product-list');

	productList.innerHTML = '';

	if (products.length === 0) {
		productList.innerHTML = '<p>No products available</p>';
		return;
	}

	products.forEach((product) => {
		const template = document.getElementById('product-card-template').content.cloneNode(true);

		const productImage = template.querySelector('.product-image');
		productImage.src = product.image?.url || '';
		productImage.alt = product.image?.alt || 'Product image';

		const productName = template.querySelector('.item-name');
		productName.textContent = product.title;

		const productLink = template.querySelector('a');
		productLink.href = `../../../assets/src/html/product-info.html?id=${product.id}`;

		const addToCartButton = template.querySelector('.add-to-cart-button');
		addToCartButton.addEventListener('click', () => {
			addItemToCart(product);
			alert('Product added to cart!');
		});

		productList.appendChild(template);
	});
}
