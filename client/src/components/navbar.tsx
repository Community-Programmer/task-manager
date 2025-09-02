import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks';
import type { RootState } from '@/store';
import { logout } from '@/store/slices/authSlice';

export function Logo() {
    return (
        <div className="flex items-center space-x-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-blue-600"
            >
                <path d="M3.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                <path d="M14 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                <path d="M3.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                <path d="M14 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                <path d="M4 6v13" />
                <path d="M14 6v13" />
                <path d="M4 9h12" />
                <path d="M4 16h12" />
            </svg>
            <span className="text-xl font-bold text-gray-900">TaskFlow</span>
        </div>
    );
}

export function Navbar() {
    const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="px-6 py-4 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to={isAuthenticated ? '/dashboard' : '/'}>
                    <Logo />
                </Link>

                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard">
                                <Button variant="ghost">Dashboard</Button>
                            </Link>
                            <div className="flex items-center space-x-4 text-gray-700">
                                <span className="text-sm">Welcome, {user?.name}</span>
                                <Button variant="outline" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="ghost">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button>Get Started</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
