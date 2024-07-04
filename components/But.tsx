import React from 'react'
import { Button } from 'react-native-paper';

function But() {
  return (
    <div>
        <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
    Press me
  </Button>
    </div>
  )
}

export default But