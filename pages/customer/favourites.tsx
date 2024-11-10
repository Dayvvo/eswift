import React, { useEffect, useState } from "react"
import Wrapper from "../../components/Wrapper"
import { PropertyCardProps } from "@/screens/Property/propertyCard"
import { PropertiesCard } from "@/screens/properties/propertiesCard";
import { Grid } from "@chakra-ui/react";
import useProperty from "@/hooks/useProperty";


const Favourites = ()=>{

    const [favourites,setFavourites] = useState<PropertyCardProps[]>([]);

    const { getFavorites } = useProperty()

    useEffect(()=>{
        (async()=>{
            try{
                const { data } = await getFavorites();
                console.log('data',data);
            }
            catch(err){
                console.log('err',err);
            }
        })()
    },[])

    return(
      <Wrapper>
            <Grid templateColumns={{lg:'repeat(3,1fr)'}}>
                {
                    favourites.map((fave,index)=>
                        <PropertiesCard key={index} {...fave} />                
                    )
                }
            </Grid>
        </Wrapper>  
    )
}