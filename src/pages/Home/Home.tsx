import React, { useState } from 'react'
import { Button } from '../../components/Button/Button'
import { TodoList } from '../../components/TodoList/TodoList'
import ModalStore from '../../store/modal'
import TodoStore from '../../store/todo'
import classes from './home.module.scss'

export const HomePage = () => {
    const [view, setView] = useState('all')

    const toggleHandler = () => {
        TodoStore.setEditId(null)
        ModalStore.setTitle('Добавить задачу')
        ModalStore.toggle()
    }

    const filtersHandler = (event: React.MouseEvent<HTMLParagraphElement>) => {
        const { view } = (event.target as HTMLParagraphElement).dataset
        view && setView(view)
    }

    const fetchHandler = () => {
        TodoStore.fetchTodo()
    }

    return (
        <div className="container">
            <div className={classes.topBar}>
                <Button text="Добавить" type="primary" onClick={toggleHandler} />
                <Button text="Загрузить" type="primary" onClick={fetchHandler} />
                <div className={classes.filters}>
                    <p className={classes.filtersTitle}>Фильтры</p>
                    <div className={classes.filtersContainer}>
                        <p
                            className={classes.filtersItems}
                            data-view="all"
                            onClick={filtersHandler}
                        >
                            Все задачи
                        </p>
                        <p
                            className={classes.filtersItems}
                            data-view="incompleted"
                            onClick={filtersHandler}
                        >
                            В работе
                        </p>
                        <p
                            className={classes.filtersItems}
                            data-view="completed"
                            onClick={filtersHandler}
                        >
                            Выполненные
                        </p>
                    </div>
                </div>
            </div>

            <TodoList view={view} />
        </div>
    )
}
