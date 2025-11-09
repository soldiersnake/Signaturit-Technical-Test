import { create } from 'zustand';
import type { DocStatus, DocumentItem } from '../types/types';
import * as api from '../api/mocks'

interface DocState {
    docs: DocumentItem[];
    loading: boolean;
    toast: string | null;
    fetch: () => Promise<void>;
    upload: (file: File) => Promise<void>;
    request: (id: string, emails: string[]) => Promise<void>;
    updateStatus: (id: string, status: DocStatus) => Promise<void>;
    closeToast: () => void;
}

export const useDocStore = create<DocState>((set, get) => ({
    docs: [],
    loading: false,
    toast: null,
    async fetch() {
        set({ loading: true });
        const docs = await api.listDocuments();
        set({ docs, loading: false });
    },
    async upload(file) {
        set({ loading: true });
        const doc = await api.uploadDocument(file);
        set({ docs: [doc, ...get().docs], loading: false, toast: `Uploaded: ${doc.name}` });
    },
    async request(id, emails) {
        set({ loading: true });
        const doc = await api.requestSignature(id, emails);
        set({ docs: get().docs.map(d => d.id === id ? doc : d), loading: false, toast: `Request sent to ${emails.length} signer(s)` });
    },
    async updateStatus(id, status) {
        set({ loading: true });
        const doc = await api.setStatus(id, status);
        set({ docs: get().docs.map(d => d.id === id ? doc : d), loading: false, toast: `Status: ${status}` });
    },
    closeToast() { set({ toast: null }); }
}));