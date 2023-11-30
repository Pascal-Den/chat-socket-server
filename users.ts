import {trimStr} from "./utils";
import {SocketUser} from "./types/socket";



let users: SocketUser[] = [];

export const findUser = (user: SocketUser) => {
    const userName = trimStr(user.name)
    const userRoom = trimStr(user.room)

    return users.find(u => trimStr(u.name) === userName
        && trimStr(u.room) === userRoom );
}

export const addUser = (user: SocketUser) => {
    const isExist = findUser(user)
    !isExist && users.push(user)
    const currentUser = isExist || user;
    return { isExist: !!isExist, user: currentUser}
}

export const removeUser = (user: SocketUser) => {
    const found = findUser(user);

    if (found) {
        users = users.filter(

            ({ room, name }) => room === found.room && name !== found.name
        );
    }
    return found;
};

export const getRoomUsers = (room: string) => users.filter(user => user.room === room)

export const getAllRoomMessages = (room: string) => {
    const allMessages: any = [];

    users.forEach(user => {
        if (user.room === room) {
            allMessages.push(...user.messageHistory.map(msg => ({ user: { name: user.name }, message: msg })));
        }
    });

    return allMessages;
};