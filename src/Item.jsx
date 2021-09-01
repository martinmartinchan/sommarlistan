import { Center, Spacer, Text, Flex } from '@chakra-ui/react'
import { CheckIcon, EditIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import ItemForm from './ItemForm'

const Item = ({ item, setData }) => {
  const [ editable, setEditable ] = useState(false)

  return <Center width='100%' maxW='20rem' pt='0.5rem' pb='0.5rem'>
    
    {
      editable
        ? <ItemForm
          item={ item }
          setDone={ () => setEditable(false) }
          setData={ setData }
        />
        : <Flex width='100%'>
            <Text mr='2rem'>{ item.name }</Text>
            <Spacer />
            <Center>
              {
                item.completed && <CheckIcon ml='0.5rem' mr='0.5rem' color='green'/>
              }
              <EditIcon
                _hover={ { cursor: 'pointer' } }
                onClick={ () => setEditable(true)}
              />
            </Center>
        </Flex>
    }
  </Center>
}

export default Item