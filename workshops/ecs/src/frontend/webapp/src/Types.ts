export type Task = {
    id: number
    title: string
    done: boolean
}

export type TodoFromResponse = {
    id: number
    title: string
    done: string
}