const express = require("express")
const morgan = require("morgan")
const cors = require('cors')

const app = express()

//adding a cors middleware to allow communication aross different origins (server: 3001 browser: 5173)
app.use(cors())

//the dist folder cointannins the production build of the frontend
//express fetches the html and the javascript using the static middleware
//if the HTTP GET request finds the correct file, it then returns it
app.use(express.static('dist'))

//defoine middleware to show requests body
app.use((request,response,next)=> {
    console.log("Method: ",request.method)
    console.log("Path: ",request.path)
    console.log("Body: ",request.body)
    console.log("--------------------")
    next()
})
morgan.token("body",(request) => {
    console.log("morgan")
    return JSON.stringify(request.body)
})
app.use(express.json())
//morgan predefined string format
app.use(morgan("tiny"))

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

    if(!req.body || !req.body.number) {
        return response.status(400).json({
            error: 'missing name or number'
        })
    } else if(alreadyAdded.includes(person.name)) {
        console.log("Already added contact or empty name")
        return res.status(400).json({ 
            error: 'name must be unique' 
          })
    }else {
        person = {...person, id: id}
        console.log(person)
        console.log(people)
        people.push(person)
        res.json(person)

    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
