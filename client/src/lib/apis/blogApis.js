import axios from 'axios'

const baseUrl = 'https://blog-app-ev8z.onrender.com'

// Get all blogs
export const getAllBlogs = async (page) => {
  try {
    const response = await axios.get(`${baseUrl}/blogs?page=${page}&limit=20`)
    return { data: response?.data }
  } catch (error) {
    return { error: error?.message || 'Something went wrong!' }
  }
}

// Get a single blog by title
export const getBlogDetails = async (blogTitle) => {
  try {
    const response = await axios.get(`${baseUrl}/blogs/${blogTitle}`)
    return { data: response?.data }
  } catch (error) {
    return { error: error?.message || 'Something went wrong!' }
  }
}
