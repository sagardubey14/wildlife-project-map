import { createContext, useContext, useState, useEffect } from "react";
import * as d3 from "d3";

const DashContext = createContext();

export const DashProvider = ({ children }) => {
  const [animalData, setAnimalData] = useState('');

  useEffect(() => {
    if (animalData) return;

    const cachedData = localStorage.getItem('animalData');
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      setAnimalData(parsedData);
    } else {
      d3.csv("/animal_data.csv")
        .then((data) => {
          localStorage.setItem('animalData', JSON.stringify(data));
          setAnimalData(data);
        })
        .catch((error) => console.error("Error fetching CSV:", error));
    }
    return () => {
      localStorage.removeItem('animalData');
    };
  }, [animalData]);

  return (
    <DashContext.Provider value={{ animalData, setAnimalData }}>
      {children}
    </DashContext.Provider>
  );
};

export function useDash() {
  return useContext(DashContext);
}
