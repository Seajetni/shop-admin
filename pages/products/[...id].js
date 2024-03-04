import { Layout } from "@/components/Layout";
import React, { useState , useEffect } from "react";
import axios from 'axios'
import { useRouter } from "next/router";

import ProductFrom from "@/components/ProductFrom";
export default function Edit() {
  
  const [productInfo,setProductInfo] = useState(null)
  const router = useRouter()
  const {id} = router.query

  useEffect(() => {
    if(!id){
      return
    }
    axios.get('/api/product?id='+ id).then(res => {
      setProductInfo(res.data.data)
    })
  },[id])
   

  

  return (
    <Layout>
      {productInfo && (
        <ProductFrom {...productInfo}/>
      )}
      
    </Layout>
  );
}
