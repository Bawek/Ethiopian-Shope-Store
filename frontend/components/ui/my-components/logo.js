import React from 'react';
import Image from 'next/image';
import logo from '../../../public/logos/projectlogo.png';
import Link from 'next/link';
const Logo = ({ hrefValue }) => {
    return (
        <Link href={hrefValue || "/"}>
            <Image
                src={logo || "/logos/projectlogo.png"}
                alt="logo seen"
                width={100}
                height={50}
                quality={100}
            />
        </Link>
    );
};

export default Logo;
