
    import {
  Container,
  LangDisplay,
  Typography,
  Flex,
  assetSwith,
  Image,
  walletIcon,
  DropDownListItemProps,
  ImageProps,
  Button,
  tablerGraph,
  Dropdown,
} from '@cypherock/cysync-ui';
import React from 'react'
import Image2 from './GraphSwitch';
import { Graphdata } from '../GraphData';


const dropDownDataWithWallet: DropDownListItemProps[] = [
    {
      id: '51',
      text: 'Official',
      checkType: 'radio',
      leftImage: <Image src={walletIcon} alt="wallet icon" />,
    },
    {
      id: '52',
      text: 'Cypherock Red',
      checkType: 'radio',
      leftImage: <Image src={walletIcon} alt="wallet icon" />,
    },
    {
      id: '53',
      text: 'Personal',
      checkType: 'radio',
      leftImage: <Image src={walletIcon} alt="wallet icon" />,
    },
    {
      id: '54',
      text: 'Business',
      checkType: 'radio',
      leftImage: <Image src={walletIcon} alt="wallet icon" />,
    },
  ];
  export interface StatsBarProps {
    setTimeValueFn:   (time: keyof typeof Graphdata | undefined) => void;
  }
    export const StatsBar:React.FC<StatsBarProps> = ({ setTimeValueFn  }) => {



        const onSelector = (value:keyof typeof Graphdata) => {
            console.log('e: ', value);
            setTimeValueFn(value)
          }
          const assetSwithClick =(value:string) =>{
            console.log('value: ', value);
          }
          const onClickDropDown = () => {
            console.log('Dropdown Selected');
          }
      return (
        <Container  display="flex" direction="row" justify="space-between" height="full">
           
        {/* left side top info  */}
         <Container 
         pl="40" 
         pr="40" 
         pt="32" 
         pb="32" 
         display="flex" direction="column">
         <Container 
         width='full'
         justify= "flex-start"
         >

           <Container
            pb="4" 
            border-bottom="1px solid #2C2520"
           width="fit-content" display="flex" direction="row"  align-items= "flex-start" justify= "flex-start" >
               <Typography
                 variant="h3"
                 $textAlign="left"
                 $letterSpacing={0.05}
                 pr={1}
                 leading-trim='both'
                 text-edge='cap'
                 // $fontFamily={font:'Poppins'}
                 // font-size='32px'
                 $fontSize={32}
                 font-style='normal'
                 $fontWeight={'semibold'}
                 line-height='normal'
               >12.72 ETH
                 {/* <LangDisplay 
               font-weight='600'
                text="12.72 ETH" /> */}
               </Typography>
                   <Image2
                   onClick={assetSwithClick}
                   pl="16"
                   src={assetSwith} 
                   alt="logo" 
                   />
           </Container>
         </Container>
           <Container 
           pt="4" 
            gap={8} display="flex" direction="row" align-items= "flex-start"  justify="center">
             <Typography
                 color="muted"
                 $textAlign="left"
                 $letterSpacing={0.02}
                 >$ 16032.087</Typography>
                 <Typography
                 color="muted"
                 $textAlign="left"
                 $letterSpacing={0.02}
                 direction="row"
                 display='flex'
                 >
                 <Flex 
                  direction="row" display="block" align-items= "center" justify="center" >
                   <Image
                   align-items= "center"
                   justify="center"
                   position='relative'
                   src={tablerGraph} 
                   alt="logo" 
                   $alignSelf="end"
                   pr='8' />
                 </Flex>1 ETH = $ 1,258.47</Typography>
           </Container>
         </Container>


         {/* buttonns and Drop down */}
           <Container  display="flex" direction="row" >
           <Container width={246} gap={8} align-items="center">
                       <Button border-radius='3px' onClick={()=>onSelector('1D')} icon='1D'variant="secondary"   size="sm"  />
                       <Button border-radius='3px' onClick={()=>onSelector('1W')} icon='1W' variant="secondary"  size="sm"/>
                       <Button border-radius='3px' onClick={()=>onSelector('1M')} icon='1M' variant="secondary"  size="sm"/>
                       <Button border-radius='3px' onClick={()=>onSelector('1Y')} icon='1Y' variant="secondary"  size="sm"/>
                       <Button border-radius='3px' onClick={()=>onSelector('ALL')} icon='ALL' variant="secondary" size="sm"/>
                   </Container>
                   <Container
                   width="250"
                   // display="flex"
                   height="24"
                   p="12"
                   justify-content= "space-between"
                   // align-items= "center"
                  >
                   <Dropdown
                     align-items= "center"
                     justify-content= "space-between"
                     items={dropDownDataWithWallet}
                     selectedItem="test"
                     disabled={false}
                     searchText="test"
                     placeholderText="All Wallets"
                     onChange={onClickDropDown}
                     leftImage={<Image src={walletIcon} alt="wallet icon" ml={3} />}
                     />
                 </Container>
             </Container>
         </Container>
      )
    }
    