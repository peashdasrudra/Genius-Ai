"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import { FileClock, Home, Settings, WalletCards } from 'lucide-react';
import { usePathname } from 'next/navigation';

function SideNav() {
  const MenuList = [
    {
      Name: 'Home',
      icon: Home,
      path: '/dashboard/',
    },
    {
      Name: 'History',
      icon: FileClock,
      path: '/dashboard/history',
    },
    {
      Name: 'Billings',
      icon: WalletCards,
      path: '/dashboard/billing',
    },
    {
      Name: 'Settings',
      icon: Settings,
      path: '/dashboard/settings',
    },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="h-screen p-5 shadow-sm border bg-white">
      {/* Logo Section */}
      <div className="flex justify-center">
        <Image src="/logo.svg" alt="logo" width={140} height={100} />
      </div>

      <hr className="my-6 border" />

      {/* Menu List Section */}
      <div className="mt-3">
        {MenuList.map((menu, index) => (
          <div
            key={index}
            className={`flex gap-2 mb-2 rounded-md cursor-pointer items-center transition-all duration-200 ${path === menu.path || (path.startsWith('/dashboard') && menu.path === '/dashboard/')
              ? 'bg-primary text-white px-2 py-2'
              : 'p-3 hover:px-2 hover:py-2 hover:bg-primary hover:text-white'
              }`}
          >
            <menu.icon className="h-6 w-6" />
            <h2 className="text-lg">{menu.Name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
