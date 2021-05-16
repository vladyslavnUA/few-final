const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

var dated = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')

const todoList = [
	{ id: 1, name: 'Finish FEW homework', completed: false, date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') },
	{ id: 2, name: 'Finish BEW homework', completed: false, date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') },
	{ id: 3, name: 'Test this final', completed: false, date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') },
    { id: 4, name: 'Begin summer break', completed: false, date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') },
]

const schema = buildSchema(`
type Todo {
    id: Int!
	name: String!
    completed: Boolean
    date: String
}

type Mutation {
    addTodo(name: String): Todo!
    completeTodo(id: ID!): Todo
    deleteTodo(id: ID!): String!
}

type Query {
    allTodos: [Todo] 
    getTodo(id: Int!): Todo
    getCompleted: [Todo]
    notCompleted: [Todo]
}
`)

const root = {
    allTodos: () => {
        return todoList
    },
    addTodo: ({ name }) => {
        const newid = todoList[todoList.length - 1].id + 1
        const todo = { name, date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''), id: newid, completed: false }
        todoList.push(todo)
        return todo
    },
    completeTodo: ({ id }) => {
        const todo = todoList[id - 1]
        if (todo === undefined) {
			return null 
		}
        todo.completed = true
        console.log(todo)
        return todo

    },
    deleteTodo: ({ id }) => {
        const todo = todoList[id - 1]
        todoList.pop(todo)
        return "Todo deleted"
    },
    getCompleted: () => { 
        return todoList.filter(todo => todo.completed == true)
    },
    notCompleted: () => { 
        return todoList.filter(todo => todo.completed == false)
    }
}


const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))

const port = 3000
app.listen(port, () => {
  console.log(`Running on port: ${port}`)
})