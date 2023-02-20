import { Button} from '@chakra-ui/react';
import { Modal } from 'antd';
import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import ReactModal from '../../shared/components/UIElements/ReactModal';
import './PlaceItem.css';
import { useDisclosure } from '@chakra-ui/react';

// import Map from '../../shared/components/UIElements/Map';
const PlaceItem = ({image, id, title, description, address, coordinates}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  return (
    <div>
<ReactModal header={title} isOpen={isOpen} onClose={onClose} coordinates={coordinates}/>
{/* // eslint-disable-next-line jsx-a11y/iframe-has-title */}


    <li className="place-item">
{/* <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12043.04784709864!2d28.980175!3d41.008583!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x236e6f6f37444fae!2sHagia%20Sophia!5e0!3m2!1sen!2s!4v1670554409788!5m2!1sen!2s" width="100" height="50" style="border:0;" 
>
</iframe> */}
    <Card className="place-item__content">
      <div className="place-item__image">
        <img src={image} alt={title} />
      </div>
      <div className="place-item__info">
        <h2>{title}</h2>
        <h3>{address}</h3>
        <p>{description}</p>
      </div>
      <div className="place-item__actions">
        {/* <button>VIEW ON MAP</button>
        <button>EDIT</button>
        <button>DELETE</button> */
        }
        <Button onClick={onOpen} variant='solid'> View On Map </Button>
        <Link to={`/places/${id}`}>
        <Button variant='solid'> Edit </Button>
        </Link>
        <Button variant='solid' onClick={() => setModal2Open(true)}> Delete </Button>
      </div>
    </Card>



  </li>  
  <Modal
        title="Vertically centered modal dialog"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>    
    </div>
  )
}

export default PlaceItem