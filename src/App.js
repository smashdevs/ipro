import React, { useState, useEffect } from 'react';
import { AddIcon, ChevronRightIcon, ChevronDownIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import {
  ChakraProvider,
  useDisclosure,
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
  IconButton,
  Button,
  ButtonGroup,
  Collapse,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher';
import theme from "./theme";
import myData from './aparelhos.json';

function App() {
  
  const [image, setImage] = useState("/assets/images/"+myData.placeholder["iphonepreco"].image);
  const [aparelho, setAparelho] = React.useState("")
  const [tipo, setTipo ] = React.useState("ipad")
  const [versao, setVersao ] = React.useState("ipad")
  const [valor, setValor] = React.useState(null)
  const [viewValor, setViewValor] = React.useState(false)
  const [vidroSelect, setVidroSelect] = React.useState(true);
  const [versaoSelect, setVersaoSelect] = React.useState(true);
  const [urlParams, setUrlParams] = React.useState("");
  const initialFocusRef = React.useRef()
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const updateUrlParams = (key,value) => {
    if(!urlParams) return;

    urlParams.set(key,value)
    console.log('updateUrlParams',key,urlParams && urlParams.get(key,value))
    window.history.replaceState('page2', window.title, window.location.pathname+"?"+urlParams.toString());
  }

  const switchAparelho = (aparelho) => {
    setAparelho(aparelho);
    updateUrlParams('aparelho',aparelho)
    console.log('aparelho',aparelho)
    switch(aparelho){
      case 'iphone':
        setVidroSelect(false);
        setVersaoSelect(true);
        setImage("/assets/images/"+myData.placeholder["iphonepreco"].image);
        setViewValor(false);
      break;
      case 'ipad':
        setVidroSelect(true);
        setVersaoSelect(false);
        setTipo('ipad');
        updateUrlParams('tipo','ipad')
        setImage("/assets/images/"+myData.placeholder["ipadpreco"].image);
        setViewValor(false);
      break;
      case 'watch':
        setVidroSelect(true);
        setVersaoSelect(false);
        setTipo('watch');
        updateUrlParams('tipo','watch')
        setImage("/assets/images/"+myData.placeholder["watchpreco"].image);
        setViewValor(false);
      break;
      default:
        setVidroSelect(true);
        setVersaoSelect(true);
      break;
    }
  }

  const switchTipo = (tipo) => {
    updateUrlParams('tipo',tipo)
    setTipo(tipo);
    console.log('tipo',tipo)
    switch(tipo){
      case '':
        setVersaoSelect(true);
      break;
      case 'iphoneFrente':
        setVersaoSelect(false);
        setTipo(tipo);
        setImage("/assets/images/"+myData.placeholder["iphonepreco"].image);
        setViewValor(false);
      break;
      case 'iphoneTampa':
        setVersaoSelect(false);
        setTipo(tipo);
        setImage("/assets/images/"+myData.placeholder["versoiphone"].image);
        setViewValor(false);
      break;
      default:
        setVidroSelect(true);
        setVersaoSelect(false);
      break
    }
  }

  const switchVersao = ( versao ) => {
    if(myData[tipo] && myData[tipo][versao]){
      setVersao(versao)
      updateUrlParams('versao',versao)
      setImage("/assets/images/"+myData[tipo][versao].image);
      setValor(myData[tipo][versao].value);
      setViewValor(true);
      return;
    }
  }

  const handleAparelhoChange = (event) => { switchAparelho(event.target.value) }
  const handleTipoChange = (event) => { switchTipo(event.target.value) }
  const handleVersaoChange = (event) => { switchVersao(event.target.value) }

  useEffect(() =>{
    console.log("Iniciando",window.location.search);
    const params = new URLSearchParams(window.location.search);
    setUrlParams(params);

    if(!(
         params.has("aparelho") && ["ipad","watch","iphone"].indexOf(params.get("aparelho")) > -1 &&
         params.has("tipo") && ["iphoneFrente","iphoneTampa","ipad","watch","iphone"].indexOf(params.get("tipo")) > -1 &&
         params.has("versao") && myData[params.get("tipo")][params.get("versao")] 
        )
      ){
      return;
    }

    if(params.has("aparelho") && ["ipad","watch","iphone"].indexOf(params.get("aparelho")) > -1){
      switchAparelho(params.get("aparelho"));
    }
    
    if(params.has("tipo")){
      setTipo(params.get("tipo"));
      switchTipo(params.get("tipo"));
    }
    
    if(params.has("versao")){
      setVersao(params.has("versao"));
      switchVersao(params.get("versao"));
    }
  },[aparelho,tipo,versao]);


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
            <Box
                 width={[ '100%', '100%', '100%', '100%' ]}
                 py="2">
                <Grid templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(6, 1fr)', md: 'repeat(6, 1fr)', lg: 'repeat(6, 1fr)', xl: 'repeat(6, 1fr)', '2xl': 'repeat(6, 1fr)' }}>
                  <GridItem px="4" colSpan={{ base: '3', sm: '3', md: '3', lg: '0', xl: '0', '2xl': '0' }} py="2">
                    <Text fontSize="3xl">QUAL O SEU APARELHO?</Text>
                  </GridItem>
                  <GridItem px="2" py={{ base: '0', sm: '3', md: '3', lg: '3', xl: '3', '2xl': '3' }}>
                    <Select className="tadaoBold"
                      value={aparelho} onChange={handleAparelhoChange}
                      variant="filled" fontSize="sm" focusBorderColor="white" icon={<ChevronDownIcon pt="1" />} bg="white" color="black" 
                      bordercolor="ligthgray" size="xs" placeholder="APARELHO" textAlign="center">
                      <option value='iphone'>IPHONE</option>
                      <option value='watch'>WATCH</option>
                      <option value='ipad'>IPAD</option>
                    </Select>
                  </GridItem>
                  <GridItem px="2" py={{ base: '0', sm: '3', md: '3', lg: '3', xl: '3', '2xl': '3' }}> 
                    <Select className="tadaoBold" 
                      value={tipo} onChange={handleTipoChange}
                      variant="filled" fontSize="sm" focusBorderColor="white" icon={<ChevronDownIcon pt="1" />} bg="white" color="black" 
                      bordercolor="ligthgray" size="xs" placeholder="VIDRO" isDisabled={vidroSelect} textAlign="center">
                      <option value='iphoneFrente'>FRONTAL</option>
                      <option value='iphoneTampa'>TRASEIRO</option>
                    </Select>
                  </GridItem> 
                  <GridItem px="2" py={{ base: '0', sm: '3', md: '3', lg: '3', xl: '3', '2xl': '3' }}>
                    <Select className="tadaoBold" value={versao} onChange={handleVersaoChange} variant="filled" fontSize="sm" focusBorderColor="white" icon={<ChevronDownIcon pt="1" />} bg="white" color="black" bordercolor="ligthgray" size="xs" placeholder="VERSÃO" isDisabled={versaoSelect} textAlign="center">
                      {Object.keys(myData[tipo]).map((key) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </Select>
                  </GridItem> 
                </Grid> 
            </Box>
            <Box>
              <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(3, 1fr)', '2xl': 'repeat(3, 1fr)' }}>
                
                {/* ======================================== */}
                <GridItem mt="4" pt="2px" pl="4" w="full" hidden={ !viewValor }
                  display={{ base: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block', '2xl': 'block' }}>
                    <Text className="tadaoBold" 
                    fontSize={{ base: '4xl', sm: '3xl', md: '3xl', lg: '3xl', xl: '3xl', '2xl': '3xl' }}>
                      TROCA DE VIDRO
                    </Text>
                    <Text className="tadaoBold" fontSize="7xl">
                      <span className="dolarSign">R$ </span> 
                      {valor}
                    </Text>
                    <Text fontSize="3xl">EM ATÉ 12X S/ JUROS</Text>
                </GridItem>
                <GridItem mt="4" pt="2px" w="full" py="8" minH="150px" hidden={ viewValor } 
                display={{ base: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block', '2xl': 'block' }}>
                    <Text className="tadaoBold" fontSize="3xl">TROCA DE VIDRO</Text>
                    <Text className="tadaoBold" fontSize="3xl">EM ATÉ 12X S/ JUROS</Text>
                </GridItem>
                {/* ======================================== */}
                
                <Center mt="0" 
                minH={{ base: '40vh', sm: '70vh', md: '60vh', lg: '60vh', xl: '60vh', '2xl': '60vh' }}
                maxH={{ base: '40vh', sm: '70vh', md: '60vh', lg: '60vh', xl: '60vh', '2xl': '60vh' }} 
                w={{ base: 'full', sm: 'full', md: 'full', lg: 'full', xl: 'full', '2xl': 'full' }}
                px="16">
                  <DetalhesModal items={myData.detalhes.items}
                    display={{ base: 'block', sm: 'none', md: 'none', lg: 'none', xl: 'none', '2xl': 'none' }}/>
                  <DeviceImage src={image}/>
                </Center>

                <GridItem mr="2"
                display={{ base: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block', '2xl': 'block' }}>
                    <CollapsibleList items={myData.detalhes.items} index={-1}/>
                </GridItem>

                <GridItem mt="4" pt="2px" hidden={ !viewValor }
                display={{ base: 'block', sm: 'none', md: 'none', lg: 'none', xl: 'none', '2xl': 'none' }}>
                    <Text className="tadaoBold" fontSize="4xl">TROCA DE VIDRO</Text>
                    <Text className="tadaoBold" fontSize="7xl">
                      <span className="dolarSign">R$ </span> 
                      {valor}
                    </Text>
                    <Text fontSize="3xl">EM ATÉ 12X S/ JUROS</Text>
                </GridItem>
                
                <GridItem mt="4" pt="2px" w="full" py="8" minH="150px" hidden={ viewValor }
                display={{ base: 'block', sm: 'none', md: 'none', lg: 'none', xl: 'none', '2xl': 'none' }}>
                    <Text className="tadaoBold" fontSize="3xl">TROCA DE VIDRO</Text>
                    <Text className="tadaoBold" fontSize="3xl">EM ATÉ 12X S/ JUROS</Text>
                </GridItem>
                
                <GridItem w="full" pt="4"
                display={{ base: 'block', sm: 'none', md: 'none', lg: 'none', xl: 'none', '2xl': 'none' }}>
                    <Button className="tadaoBold" size="lg" fontSize="2xl" aria-label='Botão contato' rightIcon={<ChevronRightIcon />} colorScheme="teal">
                      Entre em contato
                    </Button>
                </GridItem>
              
              </Grid>
            </Box>
          </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;

function CollapsibleList({ items, index }) {
  return (
      <Accordion defaultIndex={[index]} allowToggle bg="white" color="black">{
    items.map((item,key)=>(
      <AccordionItem key={key}>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              {item.nome}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} textAlign="left" maxH="100px" overflowY="auto">
          {item.texto.split('\\n').map((i,k)=>(
            <Text key={k} pb="3">{i}</Text>
            ))}
        </AccordionPanel>
      </AccordionItem>
      ))}
    </Accordion>
  );
}

function DetalhesModal({ items, display }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton onClick={onOpen} 
        aria-label='Icon' color="black" borderRadius="50%"
        icon={<AddIcon/>}
        left="200px"
        top="-120px"
        display={display}
        >Open Modal</IconButton>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size="xs" isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mais informações</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CollapsibleList items={items}/>
          </ModalBody>
          <ModalFooter>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

function Lorem() {
  return (
      <>
        Boy monofilament garage modem fluidity concrete 8-bit range-rover soul-delay warehouse gang pen. Construct hacker tube nano-systemic San Francisco RAF silent lights. Media sensory nano-post-physical boy dissident futurity disposable weathered free-market. Vehicle tank-traps dolphin dome industrial grade military-grade Tokyo wristwatch. Office semiotics youtube singularity motion assault long-chain hydrocarbons soul-delay. 
      </>
    )
}

function DeviceImage({ src }) {
  
  return (
    <Image src={ src } 
      minH={{ base: '40vh', sm: '', md: '60vh', lg: '60vh', xl: '60vh', '2xl': '60vh' }}
      ml="-40px" maxH={{ base: '40vh', sm: '70vh', md: '60vh', lg: '60vh', xl: '60vh', '2xl': '60vh' }}/>
                  )
}