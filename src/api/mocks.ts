import type { DocStatus, DocumentItem } from "../types/types";

let DB: DocumentItem[] = [];

const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));

export async function uploadDocument(file: File): Promise<DocumentItem> {
    await delay();
    const doc: DocumentItem = {
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: Date.now(),
        status: 'pending',
        signers: []
    };
    DB = [doc, ...DB];
    return doc;
}

export async function requestSignature(docId: string, emails: string[]): Promise<DocumentItem> {
    await delay();
    DB = DB.map(d => d.id === docId ? { ...d, signers: emails.map(e => ({ email: e })) } : d);
    const doc = DB.find(d => d.id === docId)!;
    return doc;
}

export async function setStatus(docId: string, status: DocStatus): Promise<DocumentItem> {
    await delay();
    DB = DB.map(d => d.id === docId ? { ...d, status } : d);
    return DB.find(d => d.id === docId)!;
}

export async function listDocuments(): Promise<DocumentItem[]> {
    await delay(200);
    return DB;
}