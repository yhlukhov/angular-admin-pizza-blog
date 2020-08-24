import { IOrder } from '../interfaces/order.interface';
import { IProduct } from '../interfaces/product.interface';

export class Order implements IOrder {
    constructor(
        public id: number,
        public userName: string,
        public userPhone: string,
        public userCity: string,
        public userStreet: string,
        public userHouse: string,
        public ordersDetails: Array<IProduct>,
        public totalPayment: number,
        public delivery: string,
        public dateOrder: Date,
        public status: string = "in progress",
        public userComment: string = '',
        public hidden = false
    ) { }
}