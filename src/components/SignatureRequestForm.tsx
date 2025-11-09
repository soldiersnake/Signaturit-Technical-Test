import { useForm } from 'react-hook-form';
import { useDocStore } from '../store/docStore';

interface Props { docId: string }

type Form = { emails: string };

export default function SignatureRequestForm({ docId }: Props) {
    const request = useDocStore(s => s.request);
    const { register, handleSubmit, reset } = useForm<Form>();

    const onSubmit = async ({ emails }: Form) => {
        const list = emails.split(',').map(e => e.trim()).filter(Boolean);
        if (list.length === 0) return;
        await request(docId, list);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="row">
            <input placeholder="emails (coma separados)" {...register('emails')} />
            <button type="submit">Send Request</button>
        </form>
    );
}