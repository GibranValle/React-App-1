const express = require('express')
const { randomBytes } = require('crypto')
const app = express()
app.use(express.json())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    const {id} = req.params
    res.send(commentsByPostId[id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex')
  const { id } = req.params
  const { content } = req.body
  const comments = commentsByPostId[id] || []
  commentsByPostId[id] = [...comments, { id: commentId, content }]
  res.status(201).send(comments)
})

app.listen(4001, () => {
  console.log('listening on port 4001')
})