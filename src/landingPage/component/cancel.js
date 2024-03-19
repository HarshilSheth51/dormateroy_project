import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const Cancel =()=>{
    return(
        <>
              <div style={{justifyContent:'center' , textAlign:'center', marginTop:'20%'}}>
    
    <h1 style={{  fontSize:'60px' , color:'red' , whiteSpace:'nowrap'}}>
    <FontAwesomeIcon icon={faXmarkCircle}  size="sm" style={{color: "red" , marginRight:'10px'}} />
Payment is Failed
</h1>


</div>
        </>

    );
}

export default Cancel;