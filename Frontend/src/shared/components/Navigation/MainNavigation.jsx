import './MainNavigation.css'
import { DrawerBody, Heading, Hide, Show } from '@chakra-ui/react'
import React from 'react'
import MainHeader from './MainHeader'
import NavLinks from './NavLinks'
import { Link } from 'react-router-dom'
import {
    Drawer,
 
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button
  } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import {HamburgerIcon} from '@chakra-ui/icons'
const MainNavigation = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const firstField = React.useRef()
        
    return (
  <MainHeader>

<Button
className='btn-nav' 
colorScheme='teal' onClick={onOpen}>
        <HamburgerIcon/>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}
        colorScheme='green'
   >
        <DrawerOverlay />
        <DrawerContent className="d-content">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Create a new account
          </DrawerHeader>
            <DrawerBody>
    <NavLinks/>

            </DrawerBody>

</DrawerContent>
</Drawer>
     <Heading className= 'h1' as='h4' size='lg'>




     <Link to ='/'> Your Places </Link>
     </Heading>
     {/* <Hide breakpoint='(max-width: 765px )'>

 <NavLinks/>
     </Hide> */}
{/* <Show breakpoint='(min-width: 765px)'>
<NavLinks/>

</Show> */}
<NavLinks id='new__nav'/>


  </MainHeader>
  )
}

export default MainNavigation
