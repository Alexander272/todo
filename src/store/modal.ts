import { makeAutoObservable } from 'mobx'

class Modal {
    title: string = ''
    isOpen = false

    constructor() {
        makeAutoObservable(this)
    }

    toggle() {
        this.isOpen = !this.isOpen
    }

    setTitle(title: string) {
        this.title = title
    }
}

export default new Modal()
