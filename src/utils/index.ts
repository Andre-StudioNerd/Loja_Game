export const formatPrice = (price: number) => {
	return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/\s/g, '');
};

export const calculateTotalPrice = (products: { id: number; price: number }[]) => {
	return products.reduce((acc, product) => acc + product.price, 0);
};

export const calculateTotalPriceWithDiscount = (
	products: { id: number; price: number }[],
	discount: number
) => {
	if (discount >= 100) {
		return 0;
	}
	if (discount < 0 || typeof discount !== 'number') {
		return calculateTotalPrice(products);
	}
	return products.reduce((acc, product) => acc + product.price, 0) * (1 - discount / 100);
};
