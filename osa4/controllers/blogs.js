const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const logger = require('../utils/logger')

blogsRouter.get('/', async (_, response) => {
  const fields = { username: 1, name: 1, id: 1 }
  const blogs = await Blog.find({}).populate('user', fields)

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = new Blog(body)
  const savedBlog = await blog.save()

  body.user = user._id
  user.blogs = user.blogs.concat(savedBlog._id)

  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blog = await Blog.findById(request.params.id)
  const userId = decodedToken.id

  if (!userId || blog.user.toString() !== userId) {
    return response.status(401).json({ error: 'invalid token' })
  }

  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const res = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true, context: 'query' }
  )

  response.json(res)
})

module.exports = blogsRouter
