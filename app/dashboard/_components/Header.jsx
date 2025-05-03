"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // icon library

function Header() {
    const path = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        console.log(path);
    }, [path]);

    const navItems = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Questions", href: "/dashboard/questions" },
        { name: "Upgrade", href: "/dashboard/upgrade" },
        { name: "How it Work?", href: "/dashboard/how" },
    ];

    return (
        <div className="flex p-5 items-center justify-between bg-secondary shadow-sm relative z-50">
            <Image src={"/logo.svg"} width={50} height={100} alt={"logo"} />

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-10">
                {navItems.map((item) => (
                    <li
                        key={item.name}
                        className={`hover:text-primary hover:font-bold transition cursor-pointer
              ${path === item.href ? "text-primary font-bold" : ""}
            `}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* User Button (always shown) */}
            <div className="hidden md:block">
                <UserButton />
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-secondary flex flex-col items-start p-4 md:hidden shadow-md space-y-3">
                    {navItems.map((item) => (
                        <li
                            key={item.name}
                            className={`list-none w-full py-2 hover:text-primary hover:font-bold transition
              ${path === item.href ? "text-primary font-bold" : ""}
            `}
                        >
                            {item.name}
                        </li>
                    ))}
                    <UserButton />
                </div>
            )}
        </div>
    );
}

export default Header;



// "use client";
// import React, {useEffect} from 'react';
// import Image from "next/image";
// import {UserButton} from "@clerk/nextjs";
// import {usePathname} from "next/navigation";
// function Header () {
//
//     const path = usePathname();
//     useEffect(() => {
//         console.log(path);
//     })
//
//     return (
//         <div className='flex p-5 items-center justify-between bg-secondary shadow-sm'>
//             <Image src={'/logo.svg'} width={50} height={100}  alt={'logo'}/>
//             <ul className= 'flex gap-20 '>
//                 <li className={` hover:text-primary hover:font-bold transition cursor-pointer
//                 ${path === '/dashboard' ? 'text-primary font-bold' : ''}
//                 `}
//                 >Dashboard</li>
//                 <li className={` hover:text-primary hover:font-bold transition cursor-pointer
//                 ${path === '/dashboard/questions' ? 'text-primary font-bold' : ''}
//                 `}>Questions</li>
//                 <li className={` hover:text-primary hover:font-bold transition cursor-pointer
//                 ${path === '/dashboard/upgrade' ? 'text-primary font-bold' : ''}
//                 `}>Upgrade</li>
//                 <li className={` hover:text-primary hover:font-bold transition cursor-pointer
//                 ${path === '/dashboard/how' ? 'text-primary font-bold' : ''}
//                 `} >How it Work?</li>
//             </ul>
//             <UserButton/>
//         </div>
//     );
// };
//
// export default Header;