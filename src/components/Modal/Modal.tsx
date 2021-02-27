import React, { ReactElement } from 'react'
import classes from './modal.module.scss'

type Props = {
    title: string
    textOk: string
    isOpen: boolean
    onToggle: (event: React.MouseEvent<HTMLDivElement>) => void
    children: ReactElement
    onClickBtn: (event: React.MouseEvent<HTMLDivElement>) => void
}

export const Modal: React.FC<Props> = ({
    title,
    textOk,
    isOpen,
    onToggle,
    children,
    onClickBtn,
}) => {
    return (
        <div className={[classes.blackout, !isOpen ? classes.hidden : null].join(' ')}>
            <div className={classes.modal}>
                <div className={classes.header}>
                    <p className={classes.title}>{title}</p>
                    <p onClick={onToggle} className={classes.close}>
                        &times;
                    </p>
                </div>
                {children}
                <div className={classes.btns}>
                    <p onClick={onClickBtn} className={classes.btn}>
                        {textOk}
                    </p>
                    <p onClick={onToggle} className={classes.btn}>
                        Отмена
                    </p>
                </div>
            </div>
        </div>
    )
}
