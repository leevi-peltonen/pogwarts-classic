import React, { createContext, useState, useEffect, ReactNode } from "react";

import { ILocation } from "../models/location";

export interface ILocationContext {
  location: ILocation,
  setLocation: React.Dispatch<React.SetStateAction<ILocation>>;
}

export const LocationContext = createContext<ILocationContext>({
  location: {} as ILocation,
  setLocation: () => {}
})

interface ILocationProviderProps {
  children: ReactNode;
}

export const LocationProvider = ({ children }: ILocationProviderProps) => {
  const [location, setLocation] = useState<ILocation>({row: 0, col: 0} as ILocation)
  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  )
}