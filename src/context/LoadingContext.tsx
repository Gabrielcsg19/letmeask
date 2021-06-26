import { createContext, useState, ReactNode } from "react";

type LoadingContextType = {
  isLoading: boolean;
  handleLoading: (loading: boolean) => void;
}

type LoadingProviderProps = {
  children: ReactNode;
}

export const LoadingContext = createContext({} as LoadingContextType)

export function LoadingContextProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);

  function handleLoading(loading: boolean) {
    setIsLoading(loading);
  }

  return (
    <LoadingContext.Provider value={{ isLoading, handleLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}