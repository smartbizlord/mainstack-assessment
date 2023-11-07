import mongoose from 'mongoose';
import { mongooseCon } from '../utils/config.js';
import { indexDb } from '../types/models.js'
import UsersSchema from './user.js';
import ProductsSchema from './product.js';


const mongooseInstance = mongoose.connect(mongooseCon.url);
export const dB: indexDb = {};

mongooseInstance
.then(async() => {
  console.info('Database is good');
})
.catch(err => {
  console.error('Database no dey work', err);
})


dB.users = mongoose.model('User', UsersSchema);
dB.products = mongoose.model('Product', ProductsSchema);