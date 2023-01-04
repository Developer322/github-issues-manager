import React, { useState } from 'react';
import Modal from 'react-modal';
import { TAddCommentModalParameters } from '../types/types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #eee',
    background: '#fff',
    width: '66%'
  },
};

const AddCommentModal = ({modalIsOpen, setModalIsOpen, callback}: TAddCommentModalParameters) => {

    const [text, setText] = useState('');
    const closeModal = () => {
      setModalIsOpen(false);
    }

    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add comment to issue"
      >
        <div className='flex flex-col items-center'>
            <textarea
              className="p-4 pl-10 my-4 resize-y text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 w-2/3"
              placeholder="New comment"
              onChange={ (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.currentTarget.value) }
              />
            <div className='flex justify-center'>
              <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                  onClick={ () => {
                      callback(text);
                      setModalIsOpen(false)
                  }}>
                      Ok
              </button>
              <button
                  className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                  onClick={ () => setModalIsOpen(false)}>
                      Cancel
                  </button>
            </div>
        </div>
      
      </Modal>
    );
}

export default AddCommentModal;