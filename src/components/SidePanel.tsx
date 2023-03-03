import React, { useContext, useEffect } from "react"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router-dom";
import { IUser } from "../models/user";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BarChartIcon from '@mui/icons-material/BarChart';
import MapIcon from '@mui/icons-material/Map';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import BackpackIcon from '@mui/icons-material/Backpack';
import QuizIcon from '@mui/icons-material/Quiz';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { ICharacterContext, CharacterContext } from "../context/CharacterContext";
import Typography from "@mui/material/Typography";
import { getLevelExperience } from "../utils/common"

const drawerWidth = 240;

interface ISidePanelProps {
  user: IUser,
  setUser: (cb: (user: IUser) => IUser) => void,
}

const SidePanel = (props: ISidePanelProps) => {
  return (
    <>
    {props.user.characters &&
      <PermanentDrawerLeft />
    }
    </>
  )
}

function PermanentDrawerLeft() {

  const navigate = useNavigate()
  const { character, setCharacter } = useContext<ICharacterContext>(CharacterContext);
  const [progress, setProgress] = React.useState(0);
  const [characterLevel, setCharacterLevel] = React.useState(character.level);
  const handleNavigation = (route: string) => {
    if(route==="World Boss Rooms") navigate("/worldbosses")
    else navigate(route)
  }
  //Progress bar progess calculation
  useEffect(() => {
    const nextLevelXP = getLevelExperience(character.level + 1)
    const currentXP = character.experience
    const progress = (currentXP / nextLevelXP) * 100
    setProgress(progress)
  }, [character.experience])

  useEffect(() => {
    setCharacterLevel(character.level)
  }, [character.level])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          {character.name && 
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ minWidth: 35 }}>
              <Typography sx={{fontSize:"13px"}} >{characterLevel}</Typography>
            </Box>
            <Box sx={{ width: '100%' }} >
              <Typography>Level progress</Typography>
              <LinearProgress color="success" variant="determinate" value={progress} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography sx={{fontSize:"13px"}} >{characterLevel + 1}</Typography>
            </Box>
          </Box>
          }
        </Toolbar>
        <Divider />
        <List>
          {['Quests', 'Contracts', 'Map', 'Battle', 'Shop', 'Inventory', 'World Boss Rooms'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleNavigation(text)}>
                <ListItemIcon>
                  {text === "Quests" && <QuizIcon />}
                  {text === "Battle" && <SportsKabaddiIcon />}
                  {text === "Contracts" && <HandshakeIcon />}
                  {text === "Map" && <MapIcon />}
                  {text === "Shop" && <LocalGroceryStoreIcon />}
                  {text === "Inventory" && <BackpackIcon />}
                  {text === "World Boss Rooms" && <SportsKabaddiIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Achievements', 'Settings', 'Stats'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleNavigation(text)}>
                <ListItemIcon>
                  {text === "Achievements" && <EmojiEventsIcon />}
                  {text === "Settings" && <SettingsApplicationsIcon />}
                  {text === "Stats" && <BarChartIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />

      </Box>
    </Box>
  );
}




export default SidePanel