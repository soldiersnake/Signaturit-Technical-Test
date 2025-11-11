import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import UploadForm from '../components/UploadForm';
import { useDocStore } from '../store/docStore';

vi.mock('../store/docStore', () => ({
    useDocStore: vi.fn(),
}));

describe('UploadForm.tsx', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('llama a upload con el primer archivo seleccionado', async () => {
        const user = userEvent.setup();
        const uploadMock = vi.fn();

        (useDocStore as any).mockImplementation((selector: any) =>
            selector({ upload: uploadMock })
        );

        render(<UploadForm />);

        const fileInput = screen.getByTestId('file-input');

        const file = new File(['dummy'], 'test.pdf', { type: 'application/pdf' });

        await user.upload(fileInput, file);
        await user.click(screen.getByRole('button', { name: /upload/i }));
        expect(uploadMock).toHaveBeenCalledTimes(1);
        expect(uploadMock).toHaveBeenCalledWith(file);
    });

    test('no llama a upload si no hay archivo', async () => {
        const user = userEvent.setup();
        const uploadMock = vi.fn();

        (useDocStore as any).mockImplementation((selector: any) =>
            selector({ upload: uploadMock })
        );

        render(<UploadForm />);
        await user.click(screen.getByRole('button', { name: /upload/i }));
        expect(uploadMock).not.toHaveBeenCalled();
    });
});
