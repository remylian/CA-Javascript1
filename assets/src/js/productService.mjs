const API_URL = 'https://v2.api.noroff.dev/rainy-days';

//function to fetch data from API.
export async function fetchProducts() {
	try {
		const response = await fetch(API_URL);
		if (!response.ok) {
			throw new Error('Failed to fetch products');
		}
		const data = await response.json();
		return data.data;
	} catch (error) {
		console.error('An error occurred while fetching products: ', error);
		return undefined;
	}
}
