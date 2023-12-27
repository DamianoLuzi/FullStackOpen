const express = require("express")
const app = express()
app.use(express.json())
let people =  [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/",(req,res) => {
    res.send("<h1>Hello World!</h1>")
})

app.get("/info", (req,res) => {
    const date = new Date()
    res.send(
        `<p>Phonebook has info for ${people.length} people</p>
        <br>
        <p>${date}</p>`
    )
})
app.get("/api/people" , (req,res) => {
    res.json(people)
})

app.get("/api/people/:id" , (req,res) => {
    const id = Number(req.params.id)
    const person = people.find(p => {
        console.log("type of people",typeof people)
        console.log(p.id, typeof p.id, id, typeof id, p.id === id)
        return p.id === id
    })
    if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
})

app.delete("/api/people/:id",(req,res) => {
    const id = Number(req.params.id)
    const person = people.filter(p => p.id === id)
    people = people.filter(p => p.id !== id)
    console.log("person to delete",person)
    console.log(people)
    res.status(204).end()
})

const generateId = () => {
    const maxId = people.length > 0
      ? Math.max(...people.map(n => n.id))
      : 0
    return maxId + 1
  }

app.post("/api/people",(req,res)=> {
    let person = req.body
    //console.log(person)
    let id = generateId()
    const alreadyAdded = people.map(p => p.name)
    if(!person.name || alreadyAdded.includes(person.name)) {
        console.log("Already added contact or empty name")
        return res.status(400).json({ 
            error: 'name must be unique and non-empty' 
          })
    }
    person = {...person, id: id}
    console.log(person)
    console.log(people)
    people.push(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
