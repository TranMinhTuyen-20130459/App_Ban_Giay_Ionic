import { CartItemModel } from "./cart-item-model";
import { AddressModel, CustomerModel } from "./customer-model";

interface OrderModel {
    customer: CustomerModel,
    to_address: AddressModel,
    note: string,
    ship_price: number,
    order_value: number,
    list_order_details: CartItemModel[]
}