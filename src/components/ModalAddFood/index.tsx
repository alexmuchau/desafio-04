import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import {Modal} from '../Modal';
import Input from '../Input';
import { Foods } from '../../hooks/useFoods';

interface AddFoodModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (food: Foods) => void;
}

export function ModalAddFood({onRequestClose, isOpen, onSubmit}:AddFoodModalProps) {

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Form onSubmit={onSubmit}>
        <h1>Novo Prato</h1>
        <Input name="img" placeholder="Cole o link aqui" />

        <Input name="title" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
