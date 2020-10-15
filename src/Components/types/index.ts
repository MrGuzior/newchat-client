export interface Message { 
    id: number,
    username: string | string[] | null,
    message: string,
    timeStamp: number,
}

export interface User {
    username: string,
    connected?: boolean
}