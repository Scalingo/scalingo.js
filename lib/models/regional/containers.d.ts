import { Operation } from "../../Operations/utils";
import { PricingGrid } from "../../params/regional/pricing";
export interface ContainersOperation {
    /** Response of the API call */
    formation: Container[];
    /** Operation information */
    operation?: Operation;
}
export interface Container {
    /** Type of container (web, worker, etc.) */
    name: string;
    /** Amount of containers of the given type */
    amount: number;
    /** Size of the containers of this type (S/M/XL/..) */
    size: string;
}
export interface ContainerSize {
    /** Unique universal identifier */
    id: string;
    /** Name of the size */
    name: string;
    /** Display name of the type */
    human_name: string;
    /** Sorting index to display a list of sizes */
    ordinal: number;
    /** Price per hour of this container size in cents */
    hourly_price: number;
    /** Price for 30 days in cents */
    thirtydays_price: number;
    /** RAM allocated to the containers in bytes */
    memory: number;
    /** Human representation of the CPU priority */
    human_cpu: string;
    /** The PID limit */
    pids_limit: number;
    /** The swap limit */
    swap: number;
    /** A SKU identifying the container size */
    sku: string;
    /** The pricing grid for this container size */
    pricings: PricingGrid;
}
export interface ContainerProcess {
    /** Unique universal identifier */
    id: string;
    /** Process type, as defined in the Procfile */
    type: string;
    /** index of the container for this type */
    type_index: number;
    /** type+index of the container for this type */
    label: number;
    /** Creation date of this container */
    created_at: string;
    /** Deletion date of this container */
    deleted_at: null;
    /** State of this container */
    state: string;
    /** The command ran by this container */
    command: string;
    /** The container size */
    container_size: ContainerSize;
}
//# sourceMappingURL=containers.d.ts.map