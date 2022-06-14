import React, { useState, useEffect } from 'react';
import { SearchIcon, ChevronRightIcon, ChevronDownIcon } from '@chakra-ui/icons'
import {
  ChakraProvider,
  Box,
  Center,
  Text,
  VStack,
  HStack,
  Stack,
  Grid,
  Flex,
  GridItem,
  Select,
  Image,
  Button,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import theme from "./theme";
import myData from './aparelhos.json';


function App() {
  
  const [image, setImage] = useState("/assets/images/"+myData.iphoneFrente[Object.keys(myData.iphoneFrente).shift()].image);
  const [aparelho, setAparelho] = React.useState("")
  const [tipo, setTipo] = React.useState("ipad")
  const [versao, setVersao] = React.useState("ipad")
  const [valor, setValor] = React.useState("00,00")
  const [vidroSelect, setVidroSelect] = React.useState(true);
  const [versaoSelect, setVersaoSelect] = React.useState(true);

  const handleAparelhoChange = (event) => {
    setAparelho(event.target.value)
    switch(event.target.value){
      case '':
        setVidroSelect(true);
        setVersaoSelect(true);
      break;
      case 'iphone':
        setVidroSelect(false);
        setVersaoSelect(true);
      break;
      case 'ipad':
        setVidroSelect(true);
        setVersaoSelect(false);
        setTipo('ipad');
      break;
      case 'watch':
        setVidroSelect(true);
        setVersaoSelect(false);
        setTipo('watch');
      break;
      default:
        setVidroSelect(true);
        setVersaoSelect(false);
      break
    }
  }
  
  const handleTipoChange = (event) => {
    console.log(event.target.value)
    switch(event.target.value){
      case '':
        setVersaoSelect(true);
      break;
      case 'iphoneFrente':
        setVersaoSelect(false);
        setTipo(event.target.value);
        setVersao()
      break;
      case 'iphoneTampa':
        setVersaoSelect(false);
        setTipo(event.target.value);
      break;
      default:
        setVidroSelect(true);
        setVersaoSelect(false);
      break
    }
  }

  const handleVersaoChange = (event) => {
    setVersao(event.target.value);
    setImage("/assets/images/"+myData[tipo][event.target.value].image);
    setValor(myData[tipo][event.target.value].value);
    console.log("/assets/images/"+myData[tipo][event.target.value].image);
  }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(queryString,urlParams.get("tipo"),urlParams.set("tipo2","5"),)
    console.log(queryString,urlParams.get("tipo"))

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" color="white" fontSize="xl" 
      backgroundImage="url('https://miro.medium.com/max/1400/1*8mNNZuvAjFWcFCcqEDMUpQ.png')">
          <style>{`
            select, select:focus, select:focus-visible, select:active {
              background-color: white !important;
            }
        `}</style>
          <VStack minH="100vh">
            <Box height={{
                  base: '100%', // 0-48em
                  md: '50%', // 48em-80em,
                  xl: '25%', // 80em+
                }}
                width={[
                  '100%', // 0-30em
                  '50%', // 30em-48em
                  '25%', // 48em-62em
                  '15%', // 62em+
                ]}
                py="2"
                >
                <Grid templateColumns='repeat(3, 1fr)'>
                  <GridItem w="full" px="4" colSpan="3" py="4">
                    <Text>QUAL O SEU APARELHO?</Text>
                  </GridItem>
                  <GridItem px="2">
                    <Select 
                      value={aparelho} onChange={handleAparelhoChange}
                      variant="filled" fontWeight="bold" focusBorderColor="white" icon={<ChevronDownIcon pt="1" />} bg="white" color="black" 
                      bordercolor="ligthgray" size="xs" placeholder="APARELHO">
                      <option value='iphone'>IPHONE</option>
                      <option value='watch'>WATCH</option>
                      <option value='ipad'>IPAD</option>
                    </Select>
                  </GridItem>
                  <GridItem px="2"> 
                    <Select 
                      value={tipo} onChange={handleTipoChange}
                      variant="filled" fontWeight="bold" focusBorderColor="white" icon={<ChevronDownIcon pt="1" />} bg="white" color="black" 
                      bordercolor="ligthgray" size="xs" placeholder="VIDRO" isDisabled={vidroSelect} textAlign="center">
                      <option value='iphoneFrente'>FRONTAL</option>
                      <option value='iphoneTampa'>TRASEIRO</option>
                    </Select>
                  </GridItem> 
                  <GridItem px="2">
                    <Select 
                      value={versao} onChange={handleVersaoChange}
                      variant="filled" fontWeight="bold" focusBorderColor="white" icon={<ChevronDownIcon pt="1" />} bg="white" color="black" 
                      bordercolor="ligthgray" size="xs" placeholder="VERSÃO" isDisabled={versaoSelect} textAlign="center">
                      {Object.keys(myData[tipo]).map((key) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </Select>
                  </GridItem> 
                </Grid> 
            </Box>
            <Center mt="0" minH="40vh" maxH="40vh" py="4" w="full" px="16">
              <Image src={image} minH="40vh" maxH="40vh"/>
            </Center>
            <Box mt="0" w="full">
                <Text>TROCA DE VIDRO</Text>
                <Text fontSize="6xl">R$ {valor}</Text>
                <Text>EM ATÉ 12X S/ JUROS</Text>
            </Box>
            <Box w="full" pt="4">
                <Button size="lg" aria-label='Botão contato' rightIcon={<ChevronRightIcon />} colorScheme="teal">
                  Nosso Contato
                </Button>
            </Box>
          </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
