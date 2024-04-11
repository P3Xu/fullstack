import { useState } from 'react'

const Blog = ({ blog, likeHandler, deleteHandler, user }) => {
  const [detailedView, setDetailedView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleView = () => {
    setDetailedView(!detailedView)
  }

  const addLike = () => {
    const blogBody = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1
    }

    likeHandler(blogBody)
  }

  const deleteBlog = blog => {
    deleteHandler(blog)
  }

  if (!detailedView) {
    return (
      <div style={blogStyle}>
        <p>
          {blog.title}{' '}
          {blog.author}{' '}
          <button onClick={toggleView}>View</button>
        </p>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <p>
          {blog.title}{' '}
          {blog.author}{' '}
          <button onClick={toggleView}>Cancel</button>
          <br />
          {blog.url}
          <br />
          Likes {blog.likes} <button onClick={addLike}>Like</button>
          <br />
          {blog.user.name}
        </p>
        <p>
          {blog.user.username === user.username &&
            <button onClick={() => {deleteBlog(blog)}}>Remove</button>
          }
        </p>
      </div>
    )
  }
}

export default Blog
