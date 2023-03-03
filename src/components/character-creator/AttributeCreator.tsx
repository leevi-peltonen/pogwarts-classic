import { Button, ButtonGroup, FormControl, Typography, Stack, Box } from "@mui/material"
import React, { useState, useEffect } from "react"
import { IAttributes } from "../../models/attributes";
import "./AttributeCreator.css"

interface IAttributeCreatorProps {
  handleSetPointsRemaining: Function
  handleAttributes: Function
}

const AttributeCreator = (props: IAttributeCreatorProps): JSX.Element => {
  
  const [pointsRemaining, setPointsRemaining] = useState(3);
  const [attributes, setAttributes] = useState<IAttributes>({
    str: 1,
    dex: 1,
    int: 1,
  })
  const ATTRIBUTE_HEADERS = ["Str", "Dex", "Int"]

  const increaseAttribute = (name: string, value: number) => {
    setAttributes((prev) => ({...prev, [name.toLowerCase()]: value + 1}))
    setPointsRemaining((prev) => prev - 1)
  }

  const decreaseAttribute = (name: string, value: number) => {
      setAttributes((prev) => ({ ...prev, [name.toLowerCase()]: value - 1 }))
      setPointsRemaining((prev) => prev + 1)
  }

  useEffect(() => {
    props.handleSetPointsRemaining(pointsRemaining)
  }, [pointsRemaining, props])

  useEffect(() => {
    props.handleAttributes(attributes)
  }, [attributes, props])


  return (
    <Box sx={{ width:"500px", height:"300px" ,border: 1, borderColor: 'divider' }} 
    >
      <Typography variant="h5" >Set attributes</Typography>
      <Typography>Points remaining: {pointsRemaining}</Typography>
      <Box 
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
      <Stack spacing={2}>
      {ATTRIBUTE_HEADERS.map((attribute, i) => {
        return(
          <FormControl key={i}>
            <Typography>{attribute}: {attributes[attribute.toLowerCase() as keyof typeof attributes]}</Typography>
            <ButtonGroup>
              <Button 
                variant="contained" 
                onClick={() => {decreaseAttribute(attribute, attributes[attribute.toLowerCase() as keyof typeof attributes])}} 
                disabled={attributes[attribute.toLowerCase() as keyof typeof attributes] <= 1} 
                size="small"
                >
                  -
              </Button>
              <Button 
                variant="contained" 
                onClick={() => {increaseAttribute(attribute, attributes[attribute.toLowerCase() as keyof typeof attributes])}} 
                disabled={pointsRemaining === 0} 
                size="small"
                >
                  +
              </Button>
            </ButtonGroup>
          </FormControl>
        )
      })}
      </Stack>
      </Box>
      
    </Box>
  )
}

export default AttributeCreator
