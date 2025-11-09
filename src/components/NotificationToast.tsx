import { useEffect } from 'react';
import { useDocStore } from '../store/docStore';

export default function NotificationToast() {
    const { toast, closeToast } = useDocStore();
    useEffect(() => {
        if (toast) {
            const t = setTimeout(closeToast, 2500);
            return () => clearTimeout(t);
        }
    }, [toast, closeToast]);

    if (!toast) return null;

    return <div className="toast">🔔 {toast}</div>;
}