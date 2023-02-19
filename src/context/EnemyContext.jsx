import { createContext, useContext, useState } from "react";


const EnemyContext = createContext()

export const useEnemy = () => {
    return useContext(EnemyContext)
}

const EnemyProvider = (props) => {

    const [ enemy, setEnemy ] = useState(null)
    const state = {
      enemy,
      setEnemy
    }

    return (
        <EnemyContext.Provider value= { state }>
            {props.children}
        </EnemyContext.Provider>
    )
}
export default EnemyProvider
