export const idleDisconnectMilliseconds=60*60*1000 // 1 Hour
export const PORT = process.env.NODE_ENV === 'production' 
                    ? 'https://new-chat-salt-server.herokuapp.com/'
                    : 'localhost:8080'
