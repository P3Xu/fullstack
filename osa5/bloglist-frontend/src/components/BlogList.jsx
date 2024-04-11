import Blog from './Blog'

const BlogsList = ({
  user,
  logoutHandler,
  likeHandler,
  deleteHandler,
  blogs,
}) => (
  <div>
    <h2>Blogs</h2>
    <p>
      {user.username} logged in{' '}
      <button onClick={logoutHandler}>logout</button>
    </p>
    {blogs
      .sort((a, b) => b.likes > a.likes ? 1 : -1)
      .map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likeHandler={likeHandler}
          deleteHandler={deleteHandler}
          user={user}
        />
      )
    }
  </div>
)

export default BlogsList
