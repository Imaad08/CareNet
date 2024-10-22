import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Author {
    id: string;
    image: string;
    username: string;
    phone: string;
}

interface displayprops {
    author: Author;
}

const Display: React.FC<displayprops> = ({ author }) => {

    return (
        <Link href={`/profile/${author?.id}`} className='w-fit'>
              <h4 className='cursor-pointer text-base-semibold text-light-1'>
                {author?.username}
              </h4>
            </Link>
    );
};

export default Display;
