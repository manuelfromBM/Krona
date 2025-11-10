//Hook para la seccion de comentarios
import { useState } from 'react';

const useModal = (initialState: boolean = false) => {
  const [modalVisible, setModalVisible] = useState(initialState);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const toggleModal = () => setModalVisible(prev => !prev);

  return {
    modalVisible,
    setModalVisible,
    openModal,
    closeModal,
    toggleModal
  };
};

export default useModal;