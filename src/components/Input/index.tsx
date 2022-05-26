import { useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import { Container } from './styles';

interface InputProps {
  name: string;
  placeholder: string;
}

export function Input({name, placeholder}:InputProps) {
  const inputRef = useRef(null);

  const [isFocused, setFocused] = useState(false);
  const [isFilled, setFilled] = useState(false);

  const { fieldName, defaultValue, registerField } = useField(name);

  function handleInputFocus() {
    setFocused(true);
  }

  function handleInputBlur(){
    setFocused(false);

    setFilled(!isFilled);
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        placeholder={placeholder}
        ref={inputRef}
      />
    </Container>
  );
};

export default Input;
