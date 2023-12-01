export type SocketUser = {
    name: string;
    room: string;
}

type User = {
    name: string
}

export type AllMessages = { 
    user: User
    message: string
}
