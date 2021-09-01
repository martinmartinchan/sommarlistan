import { Input, Checkbox, Box, Flex, Spacer, Button, useToast, Spinner } from '@chakra-ui/react'
import { isNil } from 'ramda'
import React, { useState } from 'react'
import fetchData from './fetch-data'

const ItemForm = ({ item, setDone, setData }) => {
  if (isNil(item)) return null

  const toast = useToast()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ name, setName ] = useState(item.name)
  const [ completed, setCompleted ] = useState(item.completed)

  const saveItem = () => {
    setIsLoading(true)
    const data = {
      id: item._id,
      data: {
        name,
        completed,
      }
    }
    fetch('https://75usikij68.execute-api.eu-north-1.amazonaws.com/default/sommarlistan',
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(() => {
      fetchData(setData)
        .then(() => {
          setIsLoading(false)
          setDone()
        })
    })
    .catch((e) => {
      setIsLoading(false)
      toast({
      position: "top",
      title: "Kunde inte spara",
      description: "Ingen aning varför lol",
      status: "error",
      duration: 3000,
      isClosable: true,
    })
  })
}

  const deleteItem = () => {
    const { _id } = item
    setIsLoading(true)
    fetch('https://75usikij68.execute-api.eu-north-1.amazonaws.com/default/sommarlistan',
    {
      method: 'DELETE',
      body: JSON.stringify({ id: _id }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(() => {
      fetchData(setData)
        .then(() => {
          setIsLoading(false)
          setDone()
        })
    })
    .catch((e) => {
      setIsLoading(false)
      toast({
      position: "top",
      title: "Kunde inte ta bort!",
      description: "Ingen anin varför lol",
      status: "error",
      duration: 3000,
      isClosable: true,
    })
  })
}

  return isLoading 
    ? <Spinner />
    : <Box>
    <Flex>
      <Input
        value={ name }
        onChange={ (e) => setName(e.target.value) }
      />
      <Button onClick={ deleteItem }>Ta bort</Button>
    </Flex>
    <Checkbox
      mt='1rem'
      ml='1rem'
      colorScheme="green"
      isChecked={ completed }
      onChange={ () => setCompleted(!completed) }
    >
      Färdig
    </Checkbox>
    <Flex alignContent='center' p='1rem'>
      <Button
        colorScheme='red'
        onClick={ () => setDone() }
      >
        Avbryt
      </Button>
      <Spacer />
      <Button
        colorScheme='green'
        onClick={ saveItem }
      >
        Spara
      </Button>
    </Flex>
  </Box>
}

export default ItemForm