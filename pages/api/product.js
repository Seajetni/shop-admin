import dbConnect from '../../utils/mongoDB';
import { Product } from '@/models/Product';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        if (req.query?.id) {
            const product = await Product.findById(req.query.id);
            if (!product) {
                return res.status(404).json({ success: false, message: "Product not found" });
            }
            return res.status(200).json({ success: true, data: product });
        } else {
            const products = await Product.find({});
            res.status(200).json({ success: true, data: products });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
      }
      break;
    case 'POST':
      try {
        const { name, details, price, img , featured ,img2 , img3 } = req.body;
        const product = await Product.create({ name, details, price, img , featured , img2  , img3 });
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      const { name, details, price, img  , _id , featured } = req.body;
      const product = await Product.updateOne({_id} , { name, details, price, img , featured} )
      res.status(200).json({ success: true, data: product });
    case 'DELETE':
      try {
        const { id } = req.body;
        if (!id) {
          return res.status(400).json({ success: false, message: 'Missing ID parameter' });
        }
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
          return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: deletedProduct });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
}
