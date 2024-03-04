import {model , Schema , models} from 'mongoose';

const ProductSchema = new Schema({
    name: String,
    details: String,
    price: Number,
    img: String,
    featured: Boolean,
    img2: String ,
    img3: String
});

export const Product = models.Product || model('Product', ProductSchema)
