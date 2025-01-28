import { setBlogPosts } from './blogSlice'

export const fetchBlogPosts = () => async (dispatch) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await response.json()
  dispatch(setBlogPosts(data))
}
