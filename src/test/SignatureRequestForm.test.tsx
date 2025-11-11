import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import SignatureRequestForm from '../components/SignatureRequestForm';
import { useDocStore } from '../store/docStore';

vi.mock('../store/docStore', () => ({
    useDocStore: vi.fn(),
}));

describe('SignatureRequestForm.tsx', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renderiza input y botón', () => {
        // mock mínimo, solo necesitamos request
        (useDocStore as any).mockReturnValue({
            request: vi.fn(),
        });

        render(<SignatureRequestForm docId="abc123" />);

        expect(
            screen.getByPlaceholderText(/emails \(coma separados\)/i)
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /send request/i })
        ).toBeInTheDocument();
    });

    test('llama a request con la lista de emails normalizada', async () => {
        const user = userEvent.setup();
        const requestMock = vi.fn();

        (useDocStore as any).mockImplementation((selector: any) =>
            selector({ request: requestMock })
        );

        render(<SignatureRequestForm docId="doc-1" />);
        const input = screen.getByPlaceholderText(/emails \(coma separados\)/i);
        const button = screen.getByRole('button', { name: /send request/i });
        await user.type(input, 'alice@example.com,  bob@example.com  ');
        await user.click(button);
        expect(requestMock).toHaveBeenCalledTimes(1);
        expect(requestMock).toHaveBeenCalledWith('doc-1', [
            'alice@example.com',
            'bob@example.com',
        ]);
    });

    test('no llama a request cuando el campo está vacío', async () => {
        const user = userEvent.setup();
        const requestMock = vi.fn();

        (useDocStore as any).mockReturnValue({
            request: requestMock,
        });

        render(<SignatureRequestForm docId="doc-1" />);

        const button = screen.getByRole('button', { name: /send request/i });

        await user.click(button);
        expect(requestMock).not.toHaveBeenCalled();
    });
});
