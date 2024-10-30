const apiUrl = 'https://docs.noroff.dev/docs/v2/e-commerce/rainy-days';

fetch(apiUrl)
	.then((response) => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then((data) => {
		console.log(data);
	})
	.catch((error) => {
		console.log('Error:', error);
	});
