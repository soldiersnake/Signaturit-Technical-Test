import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import NotificationToast from '../components/NotificationToast';
import { useDocStore } from '../store/docStore';

vi.mock('../store/docStore', () => ({
    useDocStore: vi.fn(),
}));

describe('NotificationToast.tsx', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('no renderiza nada si toast es null', () => {
        (useDocStore as any).mockReturnValue({
            toast: null,
            closeToast: vi.fn(),
        });

        const { container } = render(<NotificationToast />);

        expect(container.querySelector('.toast')).toBeNull();
    });

    test('muestra el mensaje cuando hay toast', () => {
        (useDocStore as any).mockReturnValue({
            toast: 'Documento firmado',
            closeToast: vi.fn(),
        });

        render(<NotificationToast />);
        expect(screen.getByText(/documento firmado/i)).toBeInTheDocument();
    });
});
