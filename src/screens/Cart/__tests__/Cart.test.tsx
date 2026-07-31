import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ContextProvider, useCart } from '../../../context';
import { BrowserRouter } from 'react-router';
import { Wrapper } from '../../../routes/helpers';
import Cart from '..';

export const mockFetch = jest.fn((url: string) => {
	if (url.includes('/categories')) {
		return Promise.resolve({
			json: () => Promise.resolve({}),
		});
	}
	if (url.includes('/products')) {
		return Promise.resolve({
			json: () => Promise.resolve({}),
		});
	}
	return Promise.resolve({
		json: () => Promise.resolve({}),
	});
});

global.fetch = mockFetch as jest.Mock;

const mockNavigate = jest.fn();

jest.mock('react-router', () => ({
	...jest.requireActual('react-router'),
	useNavigate: () => mockNavigate,
}));

const CartItemStub = () => {
	const { addItem } = useCart();

	const addTestItem = () => {
		addItem({
			id: 1,
			name: 'Test Item',
			price: 100,
			quantity: 1,
			image: 'test-image.jpg',
			description: 'Test Description',
			category: 1,
			colors: ['preto'],
			sizes: ['M'],
		});
	};

	return (
		<button onClick={addTestItem} data-testid='add-item'>
			Adicionar item de teste
		</button>
	);
};

const renderCart = async () => {
	const result = await act(async () => {
		render(
			<BrowserRouter>
				<ContextProvider>
					<Wrapper>
						<CartItemStub />
						<Cart />
					</Wrapper>
				</ContextProvider>
			</BrowserRouter>
		);
	});
	return result;
};

describe('Cart', () => {
	beforeEach(() => {
		mockFetch.mockClear();
		mockNavigate.mockClear();
	});

	test('deve renderizar a mensagem de carrinho vazio caso não tenha itens no carrinho', async () => {
		await renderCart();

		expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument();

		const continueShoppingButton = screen.getByText('Continuar comprando');
		fireEvent.click(continueShoppingButton);
		expect(mockNavigate).toHaveBeenCalledWith('/');
	});

	test('deve mostrar o item adicionado ao carrinho', async () => {
		await renderCart();

		const addItemButton = screen.getByTestId('add-item');
		await act(async () => {
			fireEvent.click(addItemButton);
		});

		expect(screen.getByText('Test Item')).toBeInTheDocument();

		const incrementButton = screen.getByRole('button', { name: '+' });
		await act(async () => {
			fireEvent.click(incrementButton);
		});

		expect(screen.getByText('2')).toBeInTheDocument();

		const decrementButton = screen.getByRole('button', { name: '-' });
		await act(async () => {
			fireEvent.click(decrementButton);
		});

		expect(screen.getByText('1')).toBeInTheDocument();

		const removeButton = screen.getByAltText('trash');
		await act(async () => {
			fireEvent.click(removeButton);
		});

		expect(screen.queryByText('Test Item')).not.toBeInTheDocument();
	});

	test('deve finalizar o pedido', async () => {
		await renderCart();

		const addItemButton = screen.getByTestId('add-item');
		await act(async () => {
			fireEvent.click(addItemButton);
		});

		const checkoutButton = screen.getByText('Finalizar pedido');
		await act(async () => {
			fireEvent.click(checkoutButton);
		});

		expect(screen.getByText('Processando...')).toBeInTheDocument();

		await waitFor(
			() => {
				expect(screen.getByText('Pedido Realizado!')).toBeInTheDocument();
			},
			{ timeout: 3000 }
		);

		expect(screen.getByText('Seu pedido foi processado com sucesso')).toBeInTheDocument();

		const returnButton = screen.getByText('Voltar para a loja');
		await act(async () => {
			fireEvent.click(returnButton);
		});

		expect(mockNavigate).toHaveBeenCalledWith('/');
	});
});
