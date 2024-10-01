"use client";

import { R } from "@/utils/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";


interface IGlobalContext {
  user: R,
  token:string,
  properties: R
};

const defaultContextState = {
  user:{},
  token:'',
  properties: {},
};

const AppContext = createContext<{globalContext:IGlobalContext,setGlobalContext?:Dispatch<SetStateAction<IGlobalContext>> }>({globalContext:defaultContextState});

export function AppContextWrapper({ children }: { children: ReactNode }) {

  const [globalContext,setGlobalContext] = useState<IGlobalContext>(defaultContextState);

  return <AppContext.Provider value={{globalContext,setGlobalContext}}>{children}</AppContext.Provider>;

}

export function useAppContext() {
  return useContext(AppContext);
}
