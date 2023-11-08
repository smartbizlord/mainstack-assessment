var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from 'mongoose';
import { mongooseCon } from '../utils/config.js';
import UsersSchema from './user.js';
import ProductsSchema from './product.js';
const mongooseInstance = mongoose.connect(mongooseCon.url);
export const dB = {};
mongooseInstance
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.info('Database is good');
}))
    .catch(err => {
    console.error('Database no dey work', err);
});
dB.users = mongoose.model('User', UsersSchema);
dB.products = mongoose.model('Product', ProductsSchema);
//# sourceMappingURL=index.js.map