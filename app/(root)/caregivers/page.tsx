import AllUsers from '@/components/common/AllUsers'
import React from 'react'


function BlogsPage() {
  
  return (
    <div className='bg-primary-foreground'>
        <div className='max-w-6xl mx-auto bg-primary-foreground pt-10 md:pt-20'>
      <div className="py-4 sm:py-8 lg:py-2">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">

          <h2 className="mb-4 text-2xl font-bold text-black md:mb-6 lg:text-5xl">All Caregivers</h2>

          <p className="max-w-screen-md text-black-400 text-sm md:text-lg">
          Check out all of these caregivers that are available to help you or your loved ones along with their contact information and resumes.
          </p>
        </div>
      </div>
    </div>
        <AllUsers />
    </div>
  )
}

export default BlogsPage