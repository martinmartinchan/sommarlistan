import React, { useState, useEffect } from 'react'
import { isNil } from 'ramda'
import { Center, Spinner } from '@chakra-ui/react'
import Board from './Board'
import fetchData from './fetch-data'


function App() {
  const [ data, setData ] = useState(null)

  useEffect(() => {
    fetchData(setData)
  }, [])
  return <Center w='100vw' mt='5vh' mb='5vh'>
    { 
      isNil(data)
        ? <Spinner />
        : <Board
          setData={ setData }
          data={ data }
          />
    }
  </Center>
  
}

export default App
