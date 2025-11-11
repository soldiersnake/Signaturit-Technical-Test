import { useForm } from 'react-hook-form';
import { useDocStore } from '../store/docStore';

interface Props { docId: string }

type Form = { emails: string };

export default function SignatureRequestForm({ docId }: Props) {
    const request = useDocStore(s => s.request);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Form>();

    const onSubmit = async ({ emails }: Form) => {
        const list = emails.split(',').map(e => e.trim()).filter(Boolean);
        if (list.length === 0) return;
        await request(docId, list);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="row">
            <div className='input-group'>
                <input
                    placeholder="emails (coma separados)"
                    {...register('emails', {
                        required: 'Debe ingresar al menos un email',
                        validate: (value) => {
                            const emails = value.split(',').map(e => e.trim()).filter(Boolean);

                            const invalid = emails.some(e => !e.includes('@'));
                            return invalid ? 'Cada email debe contener un @' : true;
                        },
                    })}
                />
                {errors.emails && (
                    <small style={{ color: 'tomato', fontWeight: 500 }}>
                        {errors.emails.message}
                    </small>
                )}
                <button type="submit">Send Request</button>
            </div>
        </form>
    );
}