import { useForm } from 'react-hook-form';
import { useDocStore } from '../store/docStore';

type Form = { file: FileList };

export default function UploadForm() {
    const { register, handleSubmit, reset } = useForm<Form>();
    const upload = useDocStore(s => s.upload);

    const onSubmit = async (data: Form) => {
        const file = data.file?.[0];
        if (!file) return;
        await upload(file);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card">
            <h2>Upload Document</h2>
            <input
                data-testid="file-input"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" {...register('file', { required: true })} />
            <button type="submit">Upload</button>
        </form>
    );
}