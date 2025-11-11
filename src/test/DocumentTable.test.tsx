import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import DocumentTable from '../components/DocumentTable';
import { useDocStore } from '../store/docStore';

vi.mock('../store/docStore', () => ({
    useDocStore: vi.fn(),
}));

const createStoreState = (override: Partial<ReturnType<typeof useDocStore>> = {}) => ({
    docs: [],
    fetch: vi.fn(),
    updateStatus: vi.fn(),
    loading: false,
    toast: null,
    upload: vi.fn(),
    request: vi.fn(),
    closeToast: vi.fn(),
    ...override,
});

describe('DocumentTable.tsx', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('llama a fetch al montarse', () => {
        const fetchMock = vi.fn();

        (useDocStore as any).mockReturnValue(
            createStoreState({ fetch: fetchMock })
        );

        render(<DocumentTable />);
        expect(fetchMock).toHaveBeenCalled();
    });

    test('renderiza una fila con nombre, estado y firmantes', () => {
        const fetchMock = vi.fn();
        const updateStatusMock = vi.fn();

        const fakeDoc = {
            id: '1',
            name: 'contract.pdf',
            size: 2048,
            type: 'application/pdf',
            uploadedAt: Date.now(),
            status: 'pending' as const,
            signers: [{ email: 'alice@example.com' }, { email: 'bob@example.com' }]
        };

        (useDocStore as any).mockReturnValue(
            createStoreState({
                docs: [fakeDoc],
                fetch: fetchMock,
                updateStatus: updateStatusMock
            })
        );

        render(<DocumentTable />);

        expect(screen.getByText(/contract\.pdf/i)).toBeInTheDocument();
        expect(screen.getByText(/pending/i)).toBeInTheDocument();
        expect(screen.getByText(/alice@example.com, bob@example.com/i)).toBeInTheDocument();
    });

    test('al hacer click en "Mark Signed" llama a updateStatus con "signed"', async () => {
        const user = userEvent.setup();
        const fetchMock = vi.fn();
        const updateStatusMock = vi.fn();

        const fakeDoc = {
            id: '1',
            name: 'contract.pdf',
            size: 2048,
            type: 'application/pdf',
            uploadedAt: Date.now(),
            status: 'pending' as const,
            signers: []
        };

        (useDocStore as any).mockReturnValue(
            createStoreState({
                docs: [fakeDoc],
                fetch: fetchMock,
                updateStatus: updateStatusMock
            })
        );

        render(<DocumentTable />);

        const btnSigned = screen.getByRole('button', { name: /mark signed/i });
        await user.click(btnSigned);
        expect(updateStatusMock).toHaveBeenCalledWith('1', 'signed');
    });
});
