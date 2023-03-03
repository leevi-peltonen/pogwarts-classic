import React, { useState, useContext, useEffect } from "react";
import { IContract } from "../../models/contract";
import { ICharacterContext, CharacterContext } from "../../context/CharacterContext";
import { getContractsAsync } from "../../api/contract";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import { Typography } from '@mui/material'

const HEADERS = ["Name", "Description", "Enemies", "Rewards", "Take Contract"]

const Contracts = () => {

  const [baseContracts, setBaseContracts] = useState<IContract[]>([] as IContract[])
  const { character, setCharacter } = useContext<ICharacterContext>(CharacterContext);

  useEffect(() => {
    async function getContracts() {
      const dbContracts = await getContractsAsync()
      setBaseContracts(dbContracts)
    }
    getContracts()
  }, [])


  const handleContractSwitch = (contract: IContract) => {

  }


  return (
    <TableContainer sx={{ maxWidth: 800, margin: "0 auto" }} component={Paper}>
      <Table sx={{ margin: "0 auto" }}>
        <TableHead>
          <TableRow>
            {HEADERS.map((header, i)=>{
              return(
                <TableCell key={i}>{header}</TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {baseContracts.map((contract, i) => {
            return (
              <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 }  }} >
                <TableCell>{contract.name}</TableCell>
                <TableCell>{contract.description}</TableCell>
                <TableCell>{contract.numEnemies}</TableCell>
                <TableCell>{contract.rewardCoins}</TableCell>
                <TableCell>
                  <Button onClick={() => handleContractSwitch(contract)} >Take Contract</Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Contracts