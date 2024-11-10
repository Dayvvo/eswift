import React, { useEffect, useState } from "react"
import Wrapper from "../../components/Wrapper"
import { PropertyCardProps } from "@/screens/Property/propertyCard"
import { PropertiesCard } from "@/screens/properties/propertiesCard";
import { Grid } from "@chakra-ui/react";
import useProperty, { Favourite } from "@/hooks/useProperty";
import { R } from "@/utils/types";


const FavouriteScreen = ()=>{

    const [favourites,setFavourites] = useState<Favourite[]>([]);

    const { getFavorites } = useProperty()

    useEffect(()=>{
        (async()=>{
            try{
                const { data:res } = await getFavorites();
                
                const favorites = {
                    ...res,
                    data: res?.data?.map((res:R)=>({
                        ...res?.property,
                        _id:res?.property?._id,
                        favoriteId:res?._id,
                        isFavorite:true,
                    } as Favourite))
                }

                setFavourites(favorites?.data)
            }
            catch(err){
                console.log('err',err);
            }
        })()
    },[])

    return(
      <Wrapper>
            <Grid templateColumns={{lg:'repeat(3,1fr)'}} columnGap={{md:'1.2em',lg:'1.5em'}}>
                {
                    favourites.map((fave,index)=>
                        <PropertiesCard key={index} {...fave} />                
                    )
                }
            </Grid>
        </Wrapper>  
    )
}


export default FavouriteScreen;