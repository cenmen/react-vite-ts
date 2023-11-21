import ReactDOM from 'react-dom/client';
import '@/styles/tailwind.css';
import 'antd/dist/reset.css';
import '@/styles/antd.css';
import App from '@/App';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(<App />);
