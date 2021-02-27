import { makeAutoObservable, runInAction } from 'mobx'
import { TodoType } from '../types/todo'

class Todo {
    todos: TodoType[] = [
        {
            id: 1234,
            title: 'Сделать Todo',
            description: 'Сделать Todo для задания',
            completed: true,
            dateOfCreation: '1614319680626',
        },
    ]
    editId: number | null = null

    constructor() {
        makeAutoObservable(this)
    }

    addTodo(todo: TodoType) {
        this.todos.push(todo)
    }

    editTodo(id: number, title: string, description: string) {
        this.todos = this.todos.map(todo =>
            todo.id === id ? { ...todo, title, description, completed: false } : todo
        )
        this.editId = null
    }

    removeTodo(id: number) {
        this.todos = this.todos.filter(todo => todo.id !== id)
    }

    completeTodo(id: number) {
        this.todos = this.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
    }

    async fetchTodo() {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            const data: TodoType[] = await res.json()
            runInAction(() => {
                this.todos = [...this.todos, ...data]
            })
        } catch (error) {}
    }

    setEditId(id: number | null) {
        this.editId = id
    }
}

export default new Todo()
