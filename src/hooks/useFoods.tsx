import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import api from "../services/api";

interface FoodProviderProps {
  children: ReactNode;
}

export interface Foods {
  id: number;
  title: string,
  img: string,
  price: string,
  description: string,
  available: boolean,
}

interface FoodContextData {
  foods: Foods[];
  addFood: (food: Foods) => void 
  editFood: (foodId: number, food: Foods) => void 
  removeFood: (foodId: number) => void
  changeAvailability: (foodId: number) => void
}

const FoodContext = createContext<FoodContextData>({} as FoodContextData)

export function FoodProvider({children}: FoodProviderProps): JSX.Element {
  const [foods, setFoods] = useState<Foods[]>([])

  useEffect(() => {
    api.get('/foods')
      .then(response => setFoods(response.data))
  }, [])

  const addFood = async (food: Foods) => {
    try{
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods(response.data)
    } catch(err) {
      console.log(err)
    }
  }

  const editFood = async (foodId: number,newFood: Foods) => {
    try {
      const food = await api.get(`/foods/${foodId}`)
      

      const foodsUpdated = foods.map(value =>
        value.id !== food.data.id ? value : newFood,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  const removeFood = async (foodId: number) => {
    await api.delete(`/foods/${foodId}`);

    const foodsFiltered = foods.filter(food => food.id !== foodId);

    setFoods(foodsFiltered);
  }

  const changeAvailability = async(foodId: number) => {
    const updatedFoods = [...foods]
    const updatedFood = updatedFoods.find(value => value.id === foodId)
    
    if(updatedFood) {
      updatedFood.available = !updatedFood.available
      setFoods(data => [...data, updatedFood]);
    } else {
      throw Error()
    }
  }
  
  return(
    <FoodContext.Provider
      value={{ foods: foods, addFood: addFood, editFood: editFood, removeFood: removeFood, changeAvailability: changeAvailability}}
    >
      {children}
    </FoodContext.Provider>
  )
}

export function useFoods(): FoodContextData {
  const context = useContext(FoodContext)

  return context
}