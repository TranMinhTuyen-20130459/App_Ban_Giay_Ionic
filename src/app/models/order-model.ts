import { CartItemModel2 } from "./cart-item-model";

export interface OrderModel {
    name_customer: string,
    phone: string,
    email_customer: string,
    to_address: AddressModel,
    note: string,
    ship_price: number,
    order_value: number,
    list_order_detail: CartItemModel2[]
}
export interface AddressModel {

    address: string,
    ward_name: string,
    district_name: string,
    province_name: string,
    ward_id: string,
    district_id: string,
    province_id: string

}