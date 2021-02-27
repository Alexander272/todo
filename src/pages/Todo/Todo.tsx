import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TodoStore from '../../store/todo'
import { TodoType } from '../../types/todo'
import classes from './todo.module.scss'

const dateOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    weekday: 'long',
    year: '2-digit',
    month: 'short',
    day: 'numeric',
}

export const TodoPage = () => {
    const [todo, setTodo] = useState<TodoType | null>(null)
    const id = useParams<{ id: string }>().id

    useEffect(() => {
        const index = TodoStore.todos.findIndex(t => t.id === +id)
        index > -1 && setTodo(TodoStore.todos[index])
    }, [id])

    return (
        <div className="container">
            <div className={classes.topBar}>
                <p className={classes.title}>{todo?.title}</p>
            </div>
            <div className={classes.container}>
                <p className={classes.date}>
                    Время создания:{' '}
                    {todo?.dateOfCreation
                        ? new Date(+todo.dateOfCreation).toLocaleDateString('RU-ru', dateOptions)
                        : 'Неизвестно'}
                </p>
                <p className={classes.status}>
                    Статус задачи: {todo?.completed ? 'Выполнена' : 'В работе'}
                </p>
                <p className={classes.description}>
                    Описание задачи: {todo?.description ? todo.description : 'Отсутствует'}
                </p>
            </div>
        </div>
    )
}
