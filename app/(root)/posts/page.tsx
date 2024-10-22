import AllPosts from '@/components/common/AllPosts'
import Banner from '@/components/common/Banner'
import React from 'react'


function BlogsPage() {
  
  return (
    <div className='bg-primary-foreground'>
        <Banner />
        <AllPosts />
    </div>
  )
}

export default BlogsPage