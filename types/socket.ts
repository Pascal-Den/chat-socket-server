export type SocketUser = {
    name: string;
    room: string;
    messageHistory: string[];
}

type User = {
    name: string
}

export type AllMessages = { 
    user: User
    message: string
}
