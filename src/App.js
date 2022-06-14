import React from 'react';
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
  GridItem,
  Select,
  Image,
  Button,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import theme from "./theme";
import myData from './aparelhos.json';

const versoes = [
"IPHONE 11",
"IPHONE 7",
"IPHONE 7P",
"IPHONE 8",
"IPHONE 8P",
"IPHONE X",
"IPHONE X",
"IPHONE X",
"IPHONE X",
"IPHONE X",
"IPHONE X",
"IPHONE X",
"IPHONE X",
"IPHONE X",
];

const image = "assets/images/"+myData.watch["WATCH SE"];

function App() {
  
  const [value, setValue] = React.useState("")
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" color="white" fontSize="xl" 
      backgroundImage="url('https://miro.medium.com/max/1400/1*8mNNZuvAjFWcFCcqEDMUpQ.png')">
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
                <style global jsx>{`
                  select, select:focus, select:focus-visible, select:active {
                    background-color: white !important;
                  }
              `}</style>
                <Grid templateColumns='repeat(3, 1fr)'>
                  <GridItem w="full" px="4" colSpan="3" py="4">
                    <Text>QUAL O SEU APARELHO?</Text>
                  </GridItem>
                  <GridItem px="2">
                    <Select 
                      value={value} onChange={handleChange}
                      variant="filled" fontWeight="bold" focusBorderColor="white" icon={<ChevronDownIcon pt="1" />} bg="white" color="black" 
                      bordercolor="ligthgray" size="xs" placeholder="APARELHO">
                      <option value='iphone'>IPHONE</option>
                      <option value='watch'>WATCH</option>
                      <option value='ipad'>IPAD</option>
                    </Select>
                  </GridItem>
                  <GridItem px="2"> 
                    <Select variant="filled" fontWeight="bold" focusBorderColor="white" icon={<ChevronDownIcon pt="1" />} bg="white" color="black" 
                      bordercolor="ligthgray" size="xs" placeholder="VIDRO">
                      <option value='iphone-frente'>FRONTAL</option>
                      <option value='iphone-tampa'>TRASEIRO</option>
                    </Select>
                  </GridItem> 
                  <GridItem px="2">
                    <Select variant="filled" fontWeight="bold" focusBorderColor="white" icon={<ChevronDownIcon pt="1" />} bg="white" color="black" 
                      bordercolor="ligthgray" size="xs" placeholder="VERSÃO">
                      {Object.keys(myData.watch).map((key) => (
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
                <Text fontSize="6xl">R$ 259,90</Text>
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
