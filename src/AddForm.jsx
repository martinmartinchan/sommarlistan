import { Input, Flex, Select, Button, Spacer, useToast, Spinner } from '@chakra-ui/react'
import React, { useState } from 'react'
import fetchData from './fetch-data'

const AddForm = ({ person, setShowAddForm, setData }) => {
  const toast = useToast()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ name, setName ] = useState('')
  const [ type, setType ] = useState('PU')

  const addItem = () => {
    setIsLoading(true)
    const data = {
      name,
      type,
      person,
      completed: false,
    }
    fetch('https://75usikij68.execute-api.eu-north-1.amazonaws.com/default/sommarlistan',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(() => {
      fetchData(setData)
        .then(() => {
          setIsLoading(false)
          setShowAddForm(false)
        })
    })
    .catch((e) => {
      console.log(e)
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

  return isLoading
    ? <Spinner />
    : <Flex direction='column' alignItems='center' width='100%' mt='1rem'>
      <Input
        value={ name }
        placeholder='Sommarsyssla'
        onChange={ (e) => setName(e.target.value) }
      />
      <Select
        mt='1rem'
        _hover={ { cursor: 'pointer' } }
        onChange={ (e) => setType(e.target.value) }
      >
        <option value="PU">Personlig Utveckling</option>
        <option value="mat">Mat</option>
        <option value="skoj">Skoj</option>
      </Select>

      <Flex width='100%' mt='1rem' mb='1rem'>
        <Button onClick={ () => setShowAddForm(false) }>Avbryt</Button>
        <Spacer></Spacer>
        <Button
          colorScheme='green'
          onClick={ () => addItem() }
        >
          Lägg till
        </Button>
      </Flex>
    </Flex>
}

 export default AddForm