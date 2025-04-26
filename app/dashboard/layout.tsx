import React from 'react';
import SideNav from './_components/SideNav';
import Header from './_components/Header';

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='bg-slate-100 h-screen'>
      {/* Side Navigation */}
      <div className="hidden md:block fixed w-64">
        <SideNav />
      </div>

      {/* Main Content */}
      <div className="md:ml-64">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default Layout;
