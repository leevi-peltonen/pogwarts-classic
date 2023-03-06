import React, { useState, useEffect, useContext } from 'react'

import { Grid, Container, Stack, Box } from "@mui/material";
import { LocationContext, ILocationContext } from '../../context/LocationContext';
import { CharacterContext, ICharacterContext } from '../../context/CharacterContext';
import { ILocation } from '../../models/location';
import Typography from '@mui/material/Typography';
import { MAP_SEED } from '../../utils/configuration';

const seedrandom = require('seedrandom');


const gridWidth = 960
const gridHeight = 500
const numCols = 15
const numRows = 9
const cellWidth = gridWidth / numCols;
const cellHeight = gridHeight / numRows;

interface BoardCell {
  row: number;
  col: number;
  type: 'Forest' | 'Mountain' | 'Plains' | 'Water';
}


const board: BoardCell[] = [];
for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    const type = calculateTileType((row * numCols + col) * MAP_SEED);
    board.push({ row, col, type });
  }
}

function calculateTileType(seed: number): 'Forest' | 'Mountain' | 'Plains' | 'Water' {
  // initialize PRNG with seed value
  const prng = seedrandom(seed.toString());
  
  // generate random number between 0 and 1
  const rand = prng();
  // use random number to determine tile type
  if (rand < 0.4) {
    return 'Forest';
  } else if (rand < 0.6) {
    return 'Mountain';
  } else if (rand < 0.8) {
    return 'Plains';
  } else {
    return 'Water';
  }
}


const Map = () => {

  const styles = {
    container: {
      color: "white",
      backgroundColor: "black"
    }
  };
  
  window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

  const { location, setLocation } = useContext<ILocationContext>(LocationContext);
  const { character, setCharacter } = useContext<ICharacterContext>(CharacterContext);
  const [characterPosition, setCharacterPosition] = useState<ILocation>(location)
  const [currentTileType, setCurrentTileType] = useState<string>("")

  const handleMove = (rowOffset: number, colOffset: number) => {
    const newRow = characterPosition.row + rowOffset;
    const newCol = characterPosition.col + colOffset;

    // check if new position is within the board bounds
    if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
      // update character position
      setCharacterPosition({ row: newRow, col: newCol });
    }
  };


  useEffect(() => {
    setLocation(characterPosition)
  }, [characterPosition])


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          handleMove(0, -1)
          break;
        case 'ArrowRight':
          handleMove(0, 1)
          break;
        case 'ArrowUp':
          handleMove(-1, 0)
          break;
        case 'ArrowDown':
          handleMove(1, 0)
          break;
        default:
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [characterPosition]);

  useEffect(() => {
    const currentCell = board.find(cell => cell.row === characterPosition.row && cell.col === characterPosition.col);
    if (currentCell) {
      setCurrentTileType(currentCell.type);
    }
  }, [characterPosition]);





  
  const cells: React.ReactNode[] = [];
  for (let i = 0; i < board.length; i++) {
    const { row, col, type } = board[i];
    const isCharacterCell = row === characterPosition.row && col === characterPosition.col;
    const cellStyle = {
      width: cellWidth,
      height: cellHeight,
      backgroundColor: type === 'Forest' ? 'green' : type === 'Mountain' ? 'grey' : type === 'Plains' ? 'yellow' : 'blue',
      opacity: isCharacterCell ? 0.6 : 0.5,
    };
    
    cells.push(
      <Grid key={`${row}-${col}`} item xs={false} style={cellStyle}>
        {isCharacterCell && <p>{character.name}</p>}
      </Grid>
    );
  }
  
  return (
    <Stack spacing={0}>
    <Container style={styles.container}>


      <Grid container spacing={0} style={{width: gridWidth, height: gridHeight}}>
        {cells}
      </Grid>
        
        


    </Container>
    <p>Current tile: {currentTileType}</p>
    <Box
    display={'flex'}
    justifyContent={"center"}
    alignItems={"center"}
    >
      <Typography sx={{maxWidth: "250px"}} variant="body1" >{tileDescriptions[currentTileType as keyof typeof tileDescriptions]}</Typography>
    </Box>
    
    </Stack>
  )
}


const tileDescriptions = {
  Forest: 'A a dense collection of trees that can make it difficult to see or move through. It may be home to wildlife or other hazards, but may also offer natural resources like wood or medicinal plants.',
  Mountain: 'A rugged terrain characterized by steep slopes and rocky outcroppings. It can be difficult to traverse and may require special equipment or skills, but can also provide breathtaking views or valuable minerals.',
  Plains: 'A wide-open expanse of flat or rolling grasslands. It is typically easy to travel through and may offer a clear line of sight, but can be vulnerable to weather extremes and lacks natural barriers for defense.',
  Water: 'Any body of water, from a small stream to a vast ocean. It can provide a valuable source of food, transportation, or recreation, but can also be hazardous to navigate and may contain hidden dangers like currents or predators.',
};


export default Map;
