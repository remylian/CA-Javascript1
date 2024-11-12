export function addFilterListener(products, renderProducts) {
	const categoryFilter = document.getElementById('category');

	categoryFilter.addEventListener('change', function () {
		const selectedCategory = categoryFilter.value.toLowerCase();
		const filteredProducts = filterProducts(products, selectedCategory);
		renderProducts(filteredProducts);
	});
}

export function filterProducts(products, filterCriteria) {
	if (filterCriteria === 'all') {
		return products;
	}

	return products.filter((product) => {
		if (filterCriteria === 'sale') {
			return product.onSale;
		} else if (product.gender) {
			return product.gender.toLowerCase() === filterCriteria;
		} else {
			return false;
		}
	});
}
