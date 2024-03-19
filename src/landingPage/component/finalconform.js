import React from "react";
import { useParams } from "react-router-dom";
import Data from "./data";
import ConformBook from "./conformbook";

const FinalConformbook = () =>{
    const { priceId } = useParams();
    const newprice = Data.find((items)=>items.fprice === priceId)
    if(!newprice){
        return <p>Not Found</p>
    }
    return(
        <>
        <ConformBook
        price={newprice.price}
        dormateroyname = {newprice.cardname}
        qty={newprice.qty}
        />
        </>
    );
}

export  default FinalConformbook;