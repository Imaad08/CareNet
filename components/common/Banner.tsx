"use client"
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Button } from '../ui/button';
const Banner: React.FC = () => {

  return (
    <div className='max-w-6xl mx-auto bg-primary-foreground pt-10 md:pt-20'>
      <div className="py-4 sm:py-8 lg:py-2">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">

          <h2 className="mb-4 text-2xl font-bold text-black md:mb-6 lg:text-5xl">All Listings</h2>

          <p className="max-w-screen-md text-black-400 text-sm md:text-lg">
          Check out listings that other people have posted. You can also create a listing if you or someone you know is in need of help.
          </p>
          <Button className='mt-4 mb-6' size="lg" onClick={() => window.location.href = '/create-post'}>Create a Post</Button>
        </div>
      </div>

      <Toaster closeButton />
    </div>
  );
}

export default Banner;
