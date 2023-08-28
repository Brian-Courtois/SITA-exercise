import { IAdress } from "./adress";
import { IVehicleType } from "./vehicleType";

export interface IOperator {
    id: string,
    name: string,
    description?: string,
    adress?: IAdress,
    supportedVehicleTypes?: IVehicleType[]
}
