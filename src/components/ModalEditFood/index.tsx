import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import {Modal} from '../Modal';
import Input from '../Input';
import { Foods } from '../../hooks/useFoods';

interface EditFoodModalProps {
  isOpen: boolean;
  editingFood: Foods
  onRequestClose: () => void;
  onSubmit: (food: Foods) => void;
}

export function ModalEditFood({onRequestClose, isOpen, onSubmit, editingFood}: EditFoodModalProps) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Form onSubmit={onSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="img" placeholder="Cole o link aqui" />

        <Input name="title" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
