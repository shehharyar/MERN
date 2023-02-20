import React from 'react';
import { Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
      Button,
    ModalCloseButton, }
    from '@chakra-ui/react';
import './Modal.css';

function ReactModal ({onClose, isOpen, header, children,coordinates }){
    return (
        <>
 <Modal isOpen={isOpen} size={'xl'} className='modal' onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className='header'>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody  className='modal-body'>
          <iframe title='map' 
          // width={100}
          // height={400}
          // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12043.047847098625!2d28.96987531738281!3d41.00858299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x236e6f6f37444fae!2sHagia%20Sophia!5e0!3m2!1sen!2s!4v1670555470070!5m2!1sen!2s" 
          src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.long}&hl=en;z=14&output=embed`}
          className='map' style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

          </ModalBody>

          <ModalFooter>
            <Button  mr={3} onClick={onClose}>
              Close
            </Button>
            <Button >Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>        </>
    )
}

export default ReactModal ;