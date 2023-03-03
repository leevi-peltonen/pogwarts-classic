import { Button, FormControl, Typography } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { ICharacterContext, CharacterContext } from "../../context/CharacterContext";
import { IBoss } from "../../models/enemy";


interface IBossFightProps {
  boss: IBoss | undefined;
}

const BossFight = (props: IBossFightProps) => {
  const [ready, setReady] = useState(false);


  const handleSetReady = () => {
    setReady(true)
    // set ready to true for this character connection
  }
  return (
    <>
      {ready
        ? <Typography variant="body1">Ready</Typography> 
        : <Button variant="contained" onClick={handleSetReady}>Ready</Button>
       }
    </>
  )

}

export default BossFight