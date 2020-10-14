import React, {createContext} from 'react'
import {SocketService} from './SocketService'

export const ChatContext: React.Context<SocketService> = createContext(new SocketService())