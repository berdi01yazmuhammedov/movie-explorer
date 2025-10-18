import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* фиксированный хэдер */}
      <Header />
      
      {/* контент страниц */}
      <main className="flex-1 px-8 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
