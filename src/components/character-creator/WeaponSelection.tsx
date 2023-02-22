import React, { useState, useEffect } from 'react'
import { getWeaponByID } from '../../api/items'
import { IWeapon } from '../../models/weapon'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, ButtonGroup, Stack } from '@mui/material';

const WeaponSelection = (props: IWeaponSelectionProps) => {

  const [starterWeapons, setStarterWeapons] = useState<IWeapon[]>([])
  const [chosenWeapon, setChosenWeapon] = useState<IWeapon | null>(null)
  useEffect(() => {
    getStarterWeapons()
  }, [])

  const getStarterWeapons = async () => {
    const responseSword = await getWeaponByID('63f4c6726b4f216722ac6ce8')
    const responseStaff = await getWeaponByID('63f4c6dd0e036e03802534aa')
    const responseBow = await getWeaponByID('63f4c6dd0e036e03802534c2')
    setStarterWeapons(() => [responseSword.data, responseStaff.data, responseBow.data])
  }

  const handleChooseWeapon = (weapon: IWeapon) => {
    setChosenWeapon(weapon)
    props.handleChosenWeapon(weapon)
  }

  const handleConfirmedWeapon = (weapon: IWeapon) => {
    setChosenWeapon(weapon)
    props.handleChosenWeapon(weapon)
  }
/*
  return (
    <>
      {chosenWeapon ? 
        <WeaponConfirmed chosenWeapon={chosenWeapon} confirmedWeapon={handleConfirmedWeapon}/> 
        : 
        <BasicTabs starterWeapons={starterWeapons} chosenWeapon={handleChooseWeapon}/>}
    </>
  )
  */
  return (
    <>
        <BasicTabs starterWeapons={starterWeapons} chosenWeapon={handleChooseWeapon}/>
    </>
  )
}

interface IWeaponSelectionProps {
  handleChosenWeapon: Function
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

interface IBasicTabProps {
  starterWeapons: IWeapon[],
  chosenWeapon: Function
}

interface IWeaponConfirmedProps {
  chosenWeapon: IWeapon
  confirmedWeapon: Function
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function BasicTabs(props: IBasicTabProps) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  useEffect(() => {
    props.chosenWeapon(props.starterWeapons[value])
  }, [value, props])

  return (
    <Box sx={{ width:"500px", height:"300px", border: 1, borderColor: 'divider' }}
    display="flex"
    justifyContent="center"
    alignItems="center"
    >
      <Stack sx={{width: "400px"}} spacing={2}>
      <Box>
        <Typography variant="h5">Choose a Weapon</Typography>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          {props.starterWeapons.map((weapon,i) => {
            return (
              <Tab label={weapon.name} key={i} {...a11yProps(i)}/>
            )
          })}
        </Tabs>
      </Box>
      {props.starterWeapons.map((weapon, i) => {
        return (
          <TabPanel key={i} value={value} index={i}>
            {weapon.description} <br/>
            Damage: {weapon.damage}
          </TabPanel>
        )
      })}
      {/*<Button  sx={{width:"200px"}} variant='contained' onClick={() => {confirmSelection()}} >Confirm Selection</Button>*/}
      </Stack>
    </Box>
  );
}

const WeaponConfirmed = (props: IWeaponConfirmedProps) => {
  return (
    <Box 
    sx={{ border: 1, borderColor: 'divider' }}
    display="flex"
    justifyContent="center"
    alignItems="center"
    >
      <Stack spacing={4}>
      <Typography>You have chosen: {props.chosenWeapon.name}</Typography>
      <Typography>{props.chosenWeapon.description}</Typography>
      <Typography>Damage: {props.chosenWeapon.damage}</Typography>
      <ButtonGroup>
        <Button  sx={{width:"200px"}} color="error" variant='contained' onClick={() => {props.confirmedWeapon(null)}}>Choose again</Button>
      </ButtonGroup>
      </Stack>
    </Box>
  )
}


export default WeaponSelection

