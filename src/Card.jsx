import { Box, Center, Flex, Heading, Button } from '@chakra-ui/react'
import { map } from 'ramda'
import React, { useState } from 'react'
import AddForm from './AddForm'
import Item from './Item'

const Card = ({ person, items, setData }) => {
  const [ showAddForm, setShowAddForm ] = useState(false)
  const {
    PU = [],
    skoj = [],
    mat = [],
  } = items
  return <Box
    m='1rem'
    minW='15rem'
    p='1rem'
    border='1px'
    borderRadius='10px'
    boxShadow='dark-lg'
    boxSizing='content-box'
  >
    <Flex direction='column' alignItems='center'>
      <Heading size='2xl'>{ person }</Heading>
      
      {
        showAddForm
        ? <AddForm person={ person } setShowAddForm={ setShowAddForm } setData={ setData }/>
        : <Button 
          m='1rem'
          colorScheme='green'
          onClick={ () => setShowAddForm(true) }
        >
          Lägg till ny sak
      </Button>
      }
    </Flex>


    <Flex mt='1rem' direction='column'>
      <Center>
        <Heading size='m'>Personlig utveckling</Heading>
      </Center>
      {
        map((item) => <Item key={ item._id } item={ item } setData={ setData }/>, PU)
      }
    </Flex>
    <Flex mt='1rem' direction='column'>
      <Center>
        <Heading size='m'>Skoj</Heading>
      </Center>
      {
        map((item) => <Item key={ item._id } item={ item } setData={ setData }/>, skoj)
      }
    </Flex>
    <Flex mt='1rem' direction='column'>
      <Center>
        <Heading size='m'>Mat</Heading>
      </Center>
      {
        map((item) => <Item key={ item._id } item={ item } setData={ setData }/>, mat)
      }
    </Flex>
  </Box>
}

export default Card