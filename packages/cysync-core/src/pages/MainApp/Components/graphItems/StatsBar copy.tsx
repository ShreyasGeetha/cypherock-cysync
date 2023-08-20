
    import {
  Container,
} from '@cypherock/cysync-ui';
import React from 'react'

import { Graphdata } from '../GraphData';



  export interface StatsBarProps {
    setTimeValueFn:   (time: keyof typeof Graphdata | undefined) => void;
  }
    export const StatsBar:React.FC<StatsBarProps> = () => (
        <Container  display="flex" direction="row" justify="space-between" height="full">
           
        {/* left side top info  */}
         <Container 
         pl="40" 
         pr="40" 
         pt="32" 
         pb={2} 
         display="flex" direction="column">        
           {/* <Container 
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
           </Container> */}
         </Container>


         {/* buttonns and Drop down */}
           {/* <Container  display="flex" direction="row" >
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
             </Container> */}
         </Container>
      )
    