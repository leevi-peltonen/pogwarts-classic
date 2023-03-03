import React from "react"
import { IMessage } from "../../pages/world-bosses/WorldBosses"
import { Stack, Container } from "@mui/material"

interface IMessageContainerProps {
  messages: IMessage[]
}

const MessageContainer = ({ messages }: IMessageContainerProps) => {
  return (
    <Container sx={{height: 300, width:300, overflow:"scroll"}}>
      <Stack spacing={2} direction="column-reverse">
        {messages.map((message: IMessage, i: number) => {
          return (
            <p>
              {message.character}: {message.message}
            </p>
          )
        })}
      </Stack>
    </Container>
  )
}

export default MessageContainer
