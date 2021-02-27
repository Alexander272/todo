import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Todo } from '../Todo/Todo'
import { Input } from '../Input/Input'
import { Modal } from '../Modal/Modal'
import { Textarea } from '../Textarea/Textarea'
import TodoStore from '../../store/todo'
import ModalStore from '../../store/modal'
import classes from './list.module.scss'
import { TodoType } from '../../types/todo'

type Props = {
    view: string
}

export const TodoList: React.FC<Props> = observer(({ view }) => {
    const [form, setForm] = useState({
        title: '',
        description: '',
    })

    useEffect(() => {
        if (TodoStore.editId) {
            const index = TodoStore.todos.findIndex(t => t.id === TodoStore.editId)
            const description: string = TodoStore.todos[index].description || ''
            setForm({
                title: TodoStore.todos[index].title,
                description,
            })
        } else {
            setForm({ title: '', description: '' })
        }
    }, [TodoStore.editId])

    const saveHandler = () => {
        if (!form.title.trim()) return
        if (TodoStore.editId) TodoStore.editTodo(TodoStore.editId, form.title, form.description)
        else
            TodoStore.addTodo({
                id: Date.now(),
                title: form.title,
                description: form.description,
                completed: false,
                dateOfCreation: Date.now().toString(),
            })
        setForm({ title: '', description: '' })
        ModalStore.toggle()
    }

    const toggleHandler = () => ModalStore.toggle()

    const changeHandler = (
        event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const renderList = () => {
        let todos: TodoType[] = []
        if (view === 'all') todos = TodoStore.todos
        if (view === 'completed') {
            todos = TodoStore.todos.filter(todo => todo.completed)
            if (!todos.length) return <p className={classes.empty}>Нет ни одной решеной задачи</p>
        }
        if (view === 'incompleted') {
            todos = TodoStore.todos.filter(todo => !todo.completed)
            if (!todos.length) return <p className={classes.empty}>Нет ни одной задачи в работе</p>
        }
        return todos.map(todo => <Todo key={todo.id} todo={todo} />)
    }

    return (
        <div className={classes.list}>
            <Modal
                title={ModalStore.title}
                textOk="Сохранить"
                isOpen={ModalStore.isOpen}
                onToggle={toggleHandler}
                onClickBtn={saveHandler}
            >
                <div>
                    <Input
                        placeholder="Название"
                        type="text"
                        value={form.title}
                        onChange={changeHandler}
                        name="title"
                    />
                    <Textarea
                        placeholder="Описание"
                        value={form.description}
                        name="description"
                        onChange={changeHandler}
                    />
                </div>
            </Modal>
            {TodoStore.todos.length ? (
                renderList()
            ) : (
                <p className={classes.empty}>Не добавлено ни одной задачи</p>
            )}
        </div>
    )
})
