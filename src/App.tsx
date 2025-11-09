import UploadForm from './components/UploadForm';
import DocumentTable from './components/DocumentTable';
import NotificationToast from './components/NotificationToast';
import { useDocStore } from './store/docStore';
import './styles.css';

export default function App() {
  const loading = useDocStore(s => s.loading);
  return (
    <main className="container">
      <header>
        <h1>Signaturit – Document Flow</h1>
      </header>
      <UploadForm />
      <DocumentTable />
      {loading && <div className="spinner">Loading…</div>}
      <NotificationToast />
    </main>
  );
}