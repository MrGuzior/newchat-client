import io from 'socket.io-client';
import {Message, User} from '../types/types'
import { fromEvent, Observable } from 'rxjs';

export class SocketService {
    private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket

    public init(): SocketService {
        this.socket = io('localhost:8080', { 'forceNew': false })
        
        return this
    }

    public sendMessage(message: Message): void {
        this.socket.emit('message', message)
        
    }

    public onIncomingMessage(): Observable<Message> {
        
        return fromEvent(this.socket, 'message')
    }

    public signIn(user: User, callback: (s:string, u:User[]|null)=>void): void {
        this.socket.emit('signIn', user, callback)
    }

    public onIncomingSignIn(): Observable<User>{
        
        return fromEvent(this.socket, 'signIn')
    }

    public disconnectUser(): void {
        
        this.socket.disconnect()
    }

    public onIncomingDisconnectUser(): Observable<User>{
        
        return fromEvent(this.socket, 'disconnect')
    }

    public onTest(): Observable<string>{
        return fromEvent(this.socket, 'test')
    }

    public onIncomingUsers(): Observable<User[]>{
        console.log('users coming')
        return fromEvent(this.socket, 'userList')
    }

    public ping(string:string): void{
        console.log('ping gets emmited')
        this.socket.emit('ping', string)
    }

    public idleTimeout(): void{
        this.socket.emit('idleTimeout')
    }

    public userTyping(): void{
        this.socket.emit('typing')
    }
}