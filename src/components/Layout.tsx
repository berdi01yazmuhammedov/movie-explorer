import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-gray-900 dark:text-white flex flex-col transition-colors duration-300">
            <Header />

            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
