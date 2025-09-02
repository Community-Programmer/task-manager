import { Provider } from 'react-redux';
import { store } from '@/store';
import { Toaster } from './ui/sonner';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <Toaster />
            {children}
        </Provider>
    );
}
