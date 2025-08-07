import { StrictMode } from 'react';
import './styles/index.scss';
import { createRoot } from 'react-dom/client';
import { App } from './components/app';
const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
