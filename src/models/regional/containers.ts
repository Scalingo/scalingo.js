import { Operation } from "../../Operations/utils";

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
}
