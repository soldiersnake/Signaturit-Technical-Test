import { render, screen } from '@testing-library/react';
import App from '../App';

test('renderiza el título principal de la app', () => {
    render(<App />);

    // Ajusta el texto según tu App.tsx
    const heading = screen.getByText(/signaturit/i);
    expect(heading).toBeInTheDocument();
});
