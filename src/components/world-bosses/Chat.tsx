import React from 'react'
import { IMessage } from '../../pages/world-bosses/WorldBosses'
import MessageContainer from './MessageContainer'
import SendMessageForm from './SendMessageForm'
import { Stack } from '@mui/material'

interface IChatProps {
  messages: IMessage[],
  sendMessage: (message: string) => void
}

const Chat = ({messages, sendMessage}: IChatProps) => {
  return (
    <Stack direction="column">
      <SendMessageForm sendMessage={sendMessage} />
      <MessageContainer messages={messages} />
    </Stack>
  )
}

export default Chat