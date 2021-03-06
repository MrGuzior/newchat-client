import io from 'socket.io-client';
import {MessageType, UserType} from '../types'
import { fromEvent, Observable } from 'rxjs';
import {SERVER} from '../config'

export class SocketService {
    private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket

    public init(): SocketService {
        this.socket = io(SERVER, { 'forceNew': false })
        return this
    }

    public sendMessage(message: MessageType): void {
        this.socket.emit('message', message)
    }

    public onIncomingMessage(): Observable<MessageType> {
        return fromEvent(this.socket, 'message')
    }

    public signIn(user: UserType, callback: (s:string, u:UserType[]|null)=>void): void {
        this.socket.emit('signIn', user, callback)
    }

    public onIncomingSignIn(): Observable<UserType>{
        return fromEvent(this.socket, 'signIn')
    }

    public disconnectUser(): void {
        this.socket.disconnect()
    }

    public onIncomingUsers(): Observable<UserType[]>{
        return fromEvent(this.socket, 'userList')
    }

    public idleTimeout(): void{
        this.socket.emit('idleTimeout')
    }

    public userTyping(): void{
        this.socket.emit('typing')
    }
}