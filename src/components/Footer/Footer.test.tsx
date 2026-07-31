import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
	test('deve renderizar o footer na tela', () => {
		render(<Footer />);
		expect(screen.getByTestId('footer')).toBeInTheDocument();
	});
});
