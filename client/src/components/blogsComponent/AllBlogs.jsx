import { useState, useEffect } from 'react'
import BlogCard from '../common/BlogCard'
import ErrorMessage from '../common/ErrorMessage'
import { getAllBlogs } from '../../lib/apis/blogApis'
import { fetchBlogPosts } from '../../lib/redux/blogActions'
import { useDispatch } from 'react-redux'

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([])
  // const dispatch = useDispatch() // dispatch function to dispatch actions
  const [pageNum, setPageNum] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  // useEffect(() => {
  //   dispatch(fetchBlogPosts())
  // }, [])

  const onGetAllBlogs = async (page) => {
    const result = await getAllBlogs(page)

    if (result?.error) {
      setIsLoading(false)
      return setErrorMessage(result?.error)
    }

    setBlogs((prev) => [...prev, ...(result?.data?.blogs ?? [])])
    setIsLoading(false)
  }

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight

      if (scrollTop + clientHeight > scrollHeight - 500) {
        setPageNum(pageNum + 1)
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fetch blogs on page number change
  useEffect(() => {
    onGetAllBlogs(pageNum)
  }, [pageNum])

  // Fetch blogs on component mount
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     onGetAllBlogs()
  //   }, 1000)
  //   return () => clearTimeout(timer)
  // }, [])

  return (
    <section className='container mx-auto my-10'>
      <div className='grid grid-cols-3'>
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog?._id}
              title={blog?.title}
              description={blog?.content}
            />
          ))
        ) : (
          <ErrorMessage message='No blog found' />
        )}
      </div>
    </section>
  )
}

export default AllBlogs
