// import BlogComponent from './components/BlogComponent'
// import blogs from './lib/blogs'
import { useSelector } from 'react-redux'

import Layout from './layout/Layout'

export default function App() {
  const { currentUser } = useSelector((state) => state.userState)
  const { blogPosts } = useSelector((state) => state.blogState)
  console.log(currentUser)
  console.log(blogPosts)
  return <Layout />
}
