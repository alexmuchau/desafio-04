import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import { useFoods, Foods } from '../../hooks/useFoods';

export function Food() {
  const { foods, editFood, removeFood, changeAvailability } = useFoods()
  
  async function toggleAvailable(foodId: number) {
    changeAvailability(foodId)
  }

  function handleEditFood(foodId: number,food: Foods) {
    editFood(foodId, food)  
  }

  function handleRemoveFood(foodId: number) {
    removeFood(foodId)  
  }

  return (
    <>
      {foods.map(food => {
        return (
          <Container available={food.available}>
            <header>
            <img src={food.img} alt={food.title} />
            </header>
            <section className="body">
              <h2>{food.title}</h2>
              <p>{food.description}</p>
              <p className="price">
                R$ <b>{food.price}</b>
              </p>
            </section>
              <section className="footer">
                <div className="icon-container">
                  <button
                    type="button"
                    className="icon"
                    onClick={() => handleEditFood(food.id, food)}
                    data-testid={`edit-food-${food.id}`}
                  >
                  <FiEdit3 size={20} />
                  </button>
                  <button
                    type="button"
                    className="icon"
                    onClick={() => handleRemoveFood(food.id)}
                    data-testid={`remove-food-${food.id}`}
                  >
                  <FiTrash size={20} />
                  </button>
                </div>

                <div className="availability-container">
                  <p>{food.available ? 'Disponível' : 'Indisponível'}</p>

                  <label htmlFor={`available-switch-${food.id}`} className="switch">
                    <input
                      id={`available-switch-${food.id}`}
                      type="checkbox"
                      checked={food.available}
                      onChange={() => toggleAvailable(food.id)}
                      data-testid={`change-status-food-${food.id}`}
                    />
                    <span className="slider" />
                  </label>
                </div>
              </section>
          </Container>
        )
      })}
    </>  
  )
};

export default Food;
