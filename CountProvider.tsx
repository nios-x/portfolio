"use client";
import { createContext, useContext, useEffect, useState } from "react";
const CountContext = createContext<string>("0");

export default function CountProvider({ children }: { children: React.ReactNode }) {
  function formatCount(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}
  const sessionStorage = typeof window !== "undefined" ? window.sessionStorage : null;
  const [count, setCount] = useState<string>("0");
    useEffect(() =>{ 
      (async () => {
      if (sessionStorage) {
        const visits = sessionStorage.getItem("visits");
          if(!visits){
            const x = await fetch("/api/visit")
            const data = await x.json();
            setCount(formatCount(data.count));
            sessionStorage.setItem("visits", data.count.toString());
          }else{
            setCount(formatCount(parseInt(visits)));
          }
        }
    })(); 
  }, []);
  
  return <CountContext.Provider value={count}>{children}</CountContext.Provider>;
}

export const useCount = () => useContext(CountContext); 
