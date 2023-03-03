import React, { useState } from 'react'
import { FormControl, TextField, Button } from '@mui/material'



interface ISendMessageFormProps {
  sendMessage(message: string): void
}

const SendMessageForm = ( {sendMessage}: ISendMessageFormProps ) => {
  const [message, setMessage] = useState<string>('')


  const handleSendMessage = () => {
    sendMessage(message)
    setMessage('')
  }


  return (
    <FormControl>
      <TextField value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button onClick={handleSendMessage}>Send</Button>
    </FormControl>
  )

}
export default SendMessageForm