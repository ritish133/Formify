import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import { LibraryBig, MessageSquare, Shield, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function SideNav() {
    const menuList = [
        { id: 1, name: 'My Forms', icon: LibraryBig, path: '/dashboard' },
        { id: 2, name: 'Responses', icon: MessageSquare, path: '/dashboard/responses' },
        { id: 3, name: 'Upgrade', icon: Shield, path: '/dashboard/upgrade' }
    ];

    const { user } = useUser();
    const path = usePathname();
    const [formList, setFormList] = useState([]);
    const [PercFileCreated, setPercFileCreated] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (user) GetFormList();
    }, [user]);

    const GetFormList = async () => {
        const result = await db.select().from(JsonForms)
            .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(JsonForms.id));

        setFormList(result);
        setPercFileCreated((result.length / 3) * 100);
    };

    return (
        <>
            {/* Hamburger Menu Button - Mobile Only */}
            {!isMenuOpen && (
                <button 
                    className="md:hidden fixed left-4 z-50 p-3 bg-gray-800 text-white rounded-full shadow-lg"
                    onClick={() => setIsMenuOpen(true)}
                >
                    <Menu size={24} />
                </button>
            )}

            {/* Sidebar - Full on Desktop, Hamburger on Mobile */}
            <div className={`fixed left-0 h-full w-64 bg-gray-900 text-white shadow-md transition-transform transform
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block`}>

                {/* Close Button (X) - Only visible in Mobile View */}
                {isMenuOpen && (
                    <button
                        className="md:hidden absolute top-4 right-4 p-2 text-white"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <X size={24} />
                    </button>
                )}

                {/* Sidebar Content */}
                <div className="p-5 mt-10 md:mt-0">
                    {menuList.map((menu, index) => (
                        <Link 
                            href={menu.path} 
                            key={index} 
                            className={`flex items-center gap-3 p-4 mb-3 rounded-lg cursor-pointer text-gray-300
                            hover:bg-primary hover:text-white 
                            ${path === menu.path && 'bg-primary text-white'}`}
                        >
                            <menu.icon />
                            {menu.name}
                        </Link>
                    ))}
                </div>

                {/* Progress Bar & Upgrade Message */}
                <div className="absolute bottom-7 p-6 w-full md:w-64">
                    <div className="my-20">
                        <Progress value={PercFileCreated} />
                        <h2 className="text-sm mt-2"><strong>{formList?.length} </strong>Out of <strong>3</strong> Files Created</h2>
                        <h2 className="text-sm mt-3">Upgrade your plan for unlimited AI form builds</h2>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideNav;