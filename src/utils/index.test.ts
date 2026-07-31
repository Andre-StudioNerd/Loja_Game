import { formatPrice, calculateTotalPrice, calculateTotalPriceWithDiscount } from '.';

// Stub de produtos
const products = [
	{
		id: 1,
		name: 'Produto 1',
		price: 10,
	},
	{
		id: 2,
		name: 'Produto 2',
		price: 20,
	},
	{
		id: 3,
		name: 'Produto 3',
		price: 30,
	},
	{
		id: 4,
		name: 'Produto 4',
		price: 40,
	},
];

// Mock da função calculateTotalPrice
const mockCalculateTotalPrice = jest.fn().mockImplementation((products) => {
	return calculateTotalPrice(products);
});

// Mock da função calculateTotalPriceWithDiscount
const mockCalculateTotalPriceWithDiscount = jest.fn().mockImplementation((products, discount) => {
	return calculateTotalPriceWithDiscount(products, discount);
});

describe('Testando funções utilitárias do projeto', () => {
	test('deve formatar o preço corretamente', () => {
		expect(formatPrice(10)).toBe('R$10,00');
	});
	test('deve calcular o preço total corretamente', () => {
		expect(mockCalculateTotalPrice(products)).toBe(100);
		expect(mockCalculateTotalPrice).toHaveBeenCalledWith(products);
	});
	test('deve calcular o preço total com desconto corretamente', () => {
		expect(mockCalculateTotalPriceWithDiscount(products, 10)).toBe(90);
		expect(mockCalculateTotalPriceWithDiscount).toHaveBeenCalledWith(products, 10);
	});
	test('deve calcular o preço ao fornecer 200% de desconto', () => {
		expect(mockCalculateTotalPriceWithDiscount(products, 200)).toBe(0);
		expect(mockCalculateTotalPriceWithDiscount).toHaveBeenCalledWith(products, 200);
	});
	test('deve calcular o preço total ao inserir um desconto negativo', () => {
		expect(mockCalculateTotalPriceWithDiscount(products, -10)).toBe(100);
		expect(mockCalculateTotalPriceWithDiscount).toHaveBeenCalledWith(products, -10);
	});
	test('deve calcular o preço total ao inserir desconto 0', () => {
		expect(mockCalculateTotalPriceWithDiscount(products, 0)).toBe(100);
		expect(mockCalculateTotalPriceWithDiscount).toHaveBeenCalledWith(products, 0);
	});
	test('deve calcular o preço total ao inserir um string abcd como desconto', () => {
		expect(mockCalculateTotalPriceWithDiscount(products, 'abcd')).toBe(100);
		expect(mockCalculateTotalPriceWithDiscount).toHaveBeenCalledWith(products, 'abcd');
	});
});
