import { Button, ButtonGroup, FormControl, Typography } from "@mui/material"
import React, { useState } from "react"
import { IAttributes } from "../../models/attributes";
import "./AttributeCreator.css"

interface IAttributeCreatorProps {
  confirmAttributes(attributes: IAttributes): void;
}

const AttributeCreator = (props: IAttributeCreatorProps): JSX.Element => {
  
  const [pointsRemaining, setPointsRemaining] = useState(10);
  const [attributes, setAttributes] = useState<IAttributes>({
    strength: 1,
    dexterity: 1,
    intelligence: 1,
  })

  const increaseAttribute = (name: string, value: number) => {
    if (pointsRemaining > 0) {
      setAttributes((prev) => ({ ...prev, [name]: value + 1 }))
      setPointsRemaining((prev) => prev - 1)
    }
  }

  const decreaseAttribute = (name: string, value: number) => {
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
        <Typography>{attributes.strength}</Typography>
        <ButtonGroup>
          <Button
            variant="contained"
            onClick={() => {
              decreaseAttribute("str", attributes.strength)
            }}
          >
            -
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              increaseAttribute("str", attributes.strength)
            }}
          >
            +
          </Button>
        </ButtonGroup>
      </FormControl>

      <FormControl>
        <label>Dexterity</label>
        <Typography>{attributes.dexterity}</Typography>
        <ButtonGroup>
          <Button
            variant="contained"
            onClick={() => {
              decreaseAttribute("dex", attributes.dexterity)
            }}
          >
            -
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              increaseAttribute("dex", attributes.dexterity)
            }}
          >
            +
          </Button>
        </ButtonGroup>
      </FormControl>

      <FormControl>
        <label>Intelligence</label>
        <Typography>{attributes.intelligence}</Typography>
        <ButtonGroup>
          <Button
            variant="contained"
            onClick={() => {
              decreaseAttribute("int", attributes.intelligence)
            }}
          >
            -
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              increaseAttribute("int", attributes.intelligence)
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
