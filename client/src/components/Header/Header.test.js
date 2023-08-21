import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component test', () => {
    describe('Rendering header', () => {
        test('should render header with correct text', () => {

            const expectedSourceAmount = '0 USD entspricht';
            const expectedTargetText = '0.89 EUR';
            render(<Header sourceCurrency="USD" targetCurrency="EUR" targetAmount="0.89" />);

            const sourceText = screen.getByTestId('source-currency');
            const targetText = screen.getByTestId('target-amount');
            
            expect(sourceText).toHaveTextContent(expectedSourceAmount);
            expect(targetText).toHaveTextContent(expectedTargetText);
        });
    });
});
