// And since I will use them on almost every file,
// I added the extension .d.ts to make the types globally available.
// And now we don't need to import them anymore.

interface ITodo {
    _id: string
    name: string
    description: string
    status: boolean
    createdAt?: string
    updatedAt?: string
}

interface TodoProps {
    todo: ITodo
}

type ApiDataType = {
    message: string
    status: string
    todos: ITodo[]
    todo?: ITodo
}