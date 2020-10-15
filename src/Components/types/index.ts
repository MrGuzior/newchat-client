export interface MessageType { 
    id: number,
    username: string | string[] | null,
    message: string,
    timeStamp: number,
}

export interface UserType {
    username: string,
    connected?: boolean
}