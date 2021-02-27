import { observer } from 'mobx-react-lite'
import React from 'react'
import { TodoType } from '../../types/todo'
import { SwitchInput } from '../SwitchInput/SwitchInput'
import TodoStore from '../../store/todo'
import ModalStore from '../../store/modal'
import classes from './todo.module.scss'
import { Link } from 'react-router-dom'

type Props = {
    todo: TodoType
}

const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: '2-digit',
    month: 'short',
    day: 'numeric',
}

export const Todo: React.FC<Props> = observer(({ todo }) => {
    const completeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        TodoStore.completeTodo(+event.target.id)
    }

    const editHandler = (event: React.MouseEvent<HTMLParagraphElement>) => {
        const { id } = (event.target as HTMLParagraphElement).dataset
        id && TodoStore.setEditId(+id)
        id && ModalStore.toggle()
        ModalStore.setTitle('Редактировать задачу')
    }

    const removeHandler = (event: React.MouseEvent<HTMLParagraphElement>) => {
        const { id } = (event.target as HTMLParagraphElement).dataset
        id && TodoStore.removeTodo(+id)
    }

    return (
        <div className={classes.todo}>
            <div className={classes.container}>
                <div className={classes.switchContainer}>
                    <SwitchInput
                        id={todo.id.toString()}
                        name="complete"
                        checked={todo.completed}
                        onChange={completeHandler}
                    />

                    <Link
                        to={`/todo/${todo.id}`}
                        className={[classes.title, todo.completed ? classes.complete : null].join(
                            ' '
                        )}
                    >
                        {todo.title}
                    </Link>
                </div>
                <p className={classes.date}>
                    Дата создания:{' '}
                    {todo.dateOfCreation
                        ? new Date(+todo.dateOfCreation).toLocaleDateString('RU-ru', dateOptions)
                        : 'Неизвестно'}
                </p>
            </div>
            <div className={classes.btns}>
                <p
                    data-id={todo.id}
                    className={[classes.btn, classes.btnEdit].join(' ')}
                    onClick={editHandler}
                >
                    &#9998;
                </p>
                <p
                    data-id={todo.id}
                    className={[classes.btn, classes.btnDelete].join(' ')}
                    onClick={removeHandler}
                >
                    &times;
                </p>
            </div>
        </div>
    )
})
