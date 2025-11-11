import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import { useDocStore } from '../store/docStore';

vi.mock('../store/docStore', () => ({
    useDocStore: vi.fn(),
}));

const createStoreState = (override: Partial<ReturnType<typeof useDocStore>> = {}) => ({
    docs: [],
    loading: false,
    toast: null,
    fetch: vi.fn(),
    upload: vi.fn(),
    request: vi.fn(),
    updateStatus: vi.fn(),
    closeToast: vi.fn(),
    ...override,
});

describe('App.tsx', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renderiza el título principal de la app', () => {
        (useDocStore as any).mockReturnValue(
            createStoreState()
        );

        render(<App />);
        expect(screen.getByText(/signaturit/i)).toBeInTheDocument();
    });

    test('renderiza los componentes principales', () => {
        (useDocStore as any).mockReturnValue(
            createStoreState()
        );

        render(<App />);
        expect(screen.getByText(/upload document/i)).toBeInTheDocument();
        expect(screen.getByText(/documents/i)).toBeInTheDocument();
    });

    test('muestra el spinner cuando loading es true', () => {
        (useDocStore as any).mockReturnValue(
            createStoreState({ loading: true })
        );

        render(<App />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('muestra notificación cuando existe toast', () => {
        (useDocStore as any).mockReturnValue(
            createStoreState({ toast: 'Documento subido' })
        );

        render(<App />);
        expect(screen.getByText(/documento subido/i)).toBeInTheDocument();
    });
});
