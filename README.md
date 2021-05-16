## Schemas
```
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
```

## Sample Queries

**Get all todos**

```
{
  allTodos {
    id
    name
    date
    completed
  }
}
```

**Get single todo by ID**

```
{
  getTodo(id:1) {
    name
    date
    completed
  }
}
```

**Get all completed todos**

```
{
  getCompleted {
    id
    name
    date
    completed
  }
}
```

**Get all not completed todos**

```
{
  notCompleted {
    id
    name
    date
    completed
  }
}
```
