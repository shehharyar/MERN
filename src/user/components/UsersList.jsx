/* eslint-disable no-unreachable */
import React from 'react'
import Dummy from './Dummy'
// import UserItem from './UserItem';
import './UsersList.css'

const UsersList = ({ items }) => {
 if(items.length === 0) {return (
    <div className='center'>
       <div>
            <h1>
                No Users Found.
            </h1>
       </div>
    
    </div>
  )}
return (
<ul>

{items.map(user => 
    <Dummy
        key={user.id}
        id={user.id} 
        name={user.name}
        image={user.image}
        placesCount={user.places}
        /> 
        )} 


    </ul>)

}

export default UsersList;