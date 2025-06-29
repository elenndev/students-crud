import express from 'express'
import { nanoid } from 'nanoid'
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(cors()) 

let students = []

app.get('/students', (req, res) => {
  res.json(students)
})

app.post('/students', (req, res) => {
  const { name, grades } = req.body
  if (!name || !grades) {
    return res.status(400).json({ error: 'params not found' })
  }

  const newStudent = {
    id: nanoid(8),
    name,
    grades
  }

  students.push(newStudent)
  res.status(201).json(newStudent)
})

app.delete('/students/:id', (req, res) => {
  const { id } = req.params
  students = students.filter(std => std.id != id)

  res.json({ message: 'student deleted' })
})

app.put('/students/:id', (req, res) => {
  const { id } = req.params
  console.log(id, students)
  const { name, grades } = req.body

  students.forEach(std =>{
    if(std.id == id){
      std.name = name
      std.grades = grades
    }
  })

  res.json(students)
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
