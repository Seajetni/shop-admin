import axios from 'axios'

import { Layout } from '@/components/Layout';

export default function Home() {


  const productIdToUpdate = '65e4504a263040215eebcf7c'; // Replace with the ID of the product you want to update

  const updatedProductData = {
    name: 'Updated Product Name',
    details: 'Updated Product Details',
    price: 99.99,
    img: 'https://example.com/updated_image.jpg'
  };
  
  const sea = () => {
    axios.put(`http://localhost:3000/products/${productIdToUpdate}`, updatedProductData)
  .then(response => {
    console.log('Product updated successfully:', response.data);
  })
  .catch(error => {
    console.error('Error updating product:', error.response.data);
  });
  }

  return (
    <>
    <Layout>

    <button onClick={sea}>sdsadasd</button>

    </Layout>
 

    </>
  );
}
