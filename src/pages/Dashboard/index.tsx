import { useState } from 'react';

import { Header } from '../../components/Header';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { Container, FoodsContainer } from './styles';
import { useFoods, Foods } from '../../hooks/useFoods';

export function DashboardPage() {
  const [ isNewFoodModalOpen, setIsNewFoodModalOpen ] = useState(false);
  const [ isEditFoodModalOpen, setIsEditFoodModalOpen ] = useState(false);
  const { foods, addFood, editFood } = useFoods()
  
  function handleAddFood(food: Foods) {
    addFood(food)  
  }

  function handleOpenModalAddFood() {
    setIsNewFoodModalOpen(true)
    // console.log(foods)
  }

  function handleCloseModalAddFood() {
    setIsNewFoodModalOpen(false)
  }

  function handleOpenModalEditFood() {
    setIsEditFoodModalOpen(true)
  }

  function handleCloseModalEditFood() {
    setIsEditFoodModalOpen(false)
  }

  function handleEditFood(food: Foods) {
    editFood(food.id, food)
  }
  return (
    <>
     <Header onOpenModalAddFood={handleOpenModalAddFood} />
      <ModalAddFood
        isOpen= {isNewFoodModalOpen}
        onRequestClose={handleCloseModalAddFood}
        onSubmit={handleAddFood}
      />
          
      <FoodsContainer data-testid="foods-list">
        <Food onOpenModalEditFood={handleOpenModalEditFood}/>
      </FoodsContainer>
      {foods.map(food => {
        return (
          <ModalEditFood
            isOpen= {isEditFoodModalOpen}
            editingFood={food}
            onRequestClose={handleCloseModalEditFood}
            onSubmit={handleEditFood}
          />
        )
      })}
    </>
  );
}

