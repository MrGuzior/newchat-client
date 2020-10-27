import io from 'socket.io-client';
import {MessageType, UserType} from '../types'
import { fromEvent, Observable } from 'rxjs';
import {PORT} from '../config'

export class SocketService {
    private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket

    public init(): SocketService {
        console.log(PORT)
        this.socket = io(PORT, { 'forceNew': false })
        
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

    public onIncomingDisconnectUser(): Observable<UserType>{
        
        return fromEvent(this.socket, 'disconnect')
    }

    public onTest(): Observable<string>{
        return fromEvent(this.socket, 'test')
    }

    public onIncomingUsers(): Observable<UserType[]>{
        return fromEvent(this.socket, 'userList')
    }

    public ping(string:string): void{
        this.socket.emit('ping', string)
    }

    public idleTimeout(): void{
        this.socket.emit('idleTimeout')
    }

    public userTyping(): void{
        this.socket.emit('typing')
    }

    public onIncomingIsTyping(): Observable<UserType>{
        return fromEvent(this.socket, 'isTyping')
    }
}