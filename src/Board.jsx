import React from 'react'
import { Flex } from '@chakra-ui/react'

import Card from './Card'

const Board = ({ data, setData }) => {
  return <Flex m='1rem' wrap='wrap' alignItems='center' justify='center'>
    <Card person='Ylva' items={ data.Ylva } setData={ setData }/>
    <Card person='Emelie' items={ data.Emelie } setData={ setData }/>
    <Card person='Martin' items={ data.Martin } setData={ setData }/>
  </Flex>
}

export default Board