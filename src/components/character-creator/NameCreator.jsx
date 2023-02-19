import "./NameCreator.css"

import { TextField, FormControl, Button } from "@mui/material"
import { useState } from "react"

const NameCreator = (props) => {
  const [name, setName] = useState("")
  return (
    <FormControl>
      <TextField
        id="filled-basic"
        label="Character Name"
        value={name}
        onChange={(event) => {
          setName(event.target.value)
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          props.confirmName(name)
        }}
      >
        Next
      </Button>
    </FormControl>
  )
}

export default NameCreator
