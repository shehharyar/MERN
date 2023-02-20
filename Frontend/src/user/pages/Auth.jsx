import React from 'react';
import './Auth.css';
import { Button, Card, Input } from 'antd';
function Auth() {
  return (
    <div>
      <Card className='card'>
      <h1>LogIn Required</h1>
      <Input placeholder="Basic usage"  className='input'/>
      <Input placeholder="Basic usage" className='input' />
      <Button className='LogIn'>Log In</Button>
      </Card>
    </div>
  )
}

export default Auth
