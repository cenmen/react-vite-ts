import ReactDOM from 'react-dom/client';
import '@/styles/default.scss';
import '@/styles/tailwind.scss';
import 'antd/dist/reset.css';
import App from '@/App';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(<App />);
