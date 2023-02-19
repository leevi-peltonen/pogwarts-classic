import { Button, ButtonGroup, FormControl, Typography } from "@mui/material"
import { useState } from "react"
import "./AttributeCreator.css"

const AttributeCreator = (props) => {
  const [pointsRemaining, setPointsRemaining] = useState(10)

  const [attributes, setAttributes] = useState({
    str: 1,
    dex: 1,
    int: 1,
  })

  const increaseAttribute = (name, value) => {
    if (pointsRemaining > 0) {
      setAttributes((prev) => ({ ...prev, [name]: value + 1 }))
      setPointsRemaining((prev) => prev - 1)
    }
  }

  const decreaseAttribute = (name, value) => {
    if (value > 1) {
      setAttributes((prev) => ({ ...prev, [name]: value - 1 }))
      setPointsRemaining((prev) => prev + 1)
    }
  }

  return (
    <>
      <p>Points remaining: {pointsRemaining}</p>
      <FormControl>
        <label>Strength</label>
        <Typography>{attributes.str}</Typography>
        <ButtonGroup>
          <Button
            variant="contained"
            onClick={() => {
              decreaseAttribute("str", attributes.str)
            }}
          >
            -
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              increaseAttribute("str", attributes.str)
            }}
          >
            +
          </Button>
        </ButtonGroup>
      </FormControl>

      <FormControl>
        <label>Dexterity</label>
        <Typography>{attributes.dex}</Typography>
        <ButtonGroup>
          <Button
            variant="contained"
            onClick={() => {
              decreaseAttribute("dex", attributes.dex)
            }}
          >
            -
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              increaseAttribute("dex", attributes.dex)
            }}
          >
            +
          </Button>
        </ButtonGroup>
      </FormControl>

      <FormControl>
        <label>Intelligence</label>
        <Typography>{attributes.int}</Typography>
        <ButtonGroup>
          <Button
            variant="contained"
            onClick={() => {
              decreaseAttribute("int", attributes.int)
            }}
          >
            -
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              increaseAttribute("int", attributes.int)
            }}
          >
            +
          </Button>
        </ButtonGroup>
        <Button
        variant="contained"
        onClick={() => {
          props.confirmAttributes(attributes)
        }}
      >
        Next
      </Button>
      </FormControl>
    </>
  )
}

export default AttributeCreator
