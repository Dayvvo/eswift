import NavBar from "@/components/navBar";
import { PropertyDetails } from "@/components/PropertyDetails";
import { appBodyPosition } from "@/utils/modules";
import { Center } from "@chakra-ui/react";



const PropertiesDetailScreen = () => 
    (
        <>
            <NavBar/>        
            <Center position={'relative'} top='96px' py={'2em'} className="center">
               <PropertyDetails clientView/>
            </Center>
        </>
    );
  
  export default PropertiesDetailScreen;