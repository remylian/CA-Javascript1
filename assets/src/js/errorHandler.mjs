//function to handle errors

export async function handleError(asyncFunction, { errorMessageElement, loadingSpinnerElement } = {}) {
	try {
		return await asyncFunction();
	} catch (error) {
		console.error('An error ocurred', error);
		if (errorMessageElement) {
			errorMessageElement.style.display = 'block';
		}
		if (loadingSpinnerElement) {
			loadingSpinnerElement.style.display = 'none';
		}
		return undefined;
	}
}
