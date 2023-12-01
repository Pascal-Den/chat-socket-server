import {trimStr} from "../utils";
import {SocketUser} from "../types/socket";

interface MessageHistory {
    user: SocketUser;
    message: string;
}


let usersService: SocketUser[] = [];
export let messageHistory: MessageHistory[] = []



export const findUser = (user: SocketUser) => {

    const userName = trimStr(user.name)
    const userRoom = trimStr(user.room)

    return usersService.find(u => trimStr(u.name) === userName
        && trimStr(u.room) === userRoom );
}

export const addUser = (user: SocketUser) => {
    const isExist = findUser(user)
    if(!isExist) {
        usersService.push(user)
    }
    return { isExist: !!isExist, user}
}

export const removeUser = (user: SocketUser) => {
    const found = findUser(user);

    if (found) {
        usersService = usersService.filter(
            ({ room, name }) => room === found.room && name !== found.name
        );
    }
    return found;
};

export const getRoomUsers = (room: string) => usersService.filter(user => user.room === room)

export const addMessageToHistory = (user: SocketUser, message: string) => {
    messageHistory.push({user, message})
};


export const getAllRoomMessages = (room: string) => {
    return messageHistory.filter(message => message.user.room === room)
};