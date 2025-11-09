export type DocStatus = 'pending' | 'signed' | 'declined';

export interface Signer { email: string }

export interface DocumentItem {
    id: string;
    name: string;
    size: number;
    type: string; // mime
    uploadedAt: number;
    status: DocStatus;
    signers: Signer[];
}