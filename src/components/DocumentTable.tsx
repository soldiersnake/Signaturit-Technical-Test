import { useEffect } from 'react';
import { useDocStore } from '../store/docStore';
import SignatureRequestForm from './SignatureRequestForm';
import type { DocStatus } from '../types/types';

export default function DocumentTable() {
    const { docs, fetch, updateStatus } = useDocStore();
    useEffect(() => {
        fetch();
    }, [fetch]);

    const set = (id: string, status: DocStatus) => updateStatus(id, status);

    return (
        <div className="card">
            <h2>Documents</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th><th>Status</th><th>Signers</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {docs.map(d => (
                        <tr key={d.id}>
                            <td>
                                <div className="title">{d.name}</div>
                                <small>{(d.size / 1024).toFixed(1)} KB</small>
                                <SignatureRequestForm docId={d.id} />
                            </td>
                            <td><span className={`badge ${d.status}`}>{d.status}</span></td>
                            <td>{d.signers.map(s => s.email).join(', ') || '—'}</td>
                            <td className="row gap">
                                <button onClick={() => set(d.id, 'signed')}>Mark Signed</button>
                                <button onClick={() => set(d.id, 'declined')} className="secondary">Mark Declined</button>
                                <button onClick={() => set(d.id, 'pending')} className="ghost">Reset</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}