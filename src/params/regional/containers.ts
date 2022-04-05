import { App, ContainerProcess } from "src/models/regional";

export interface RunParams {
  /** The command to run */
  command: string;
  /** Whether to run in detached mode or not. false if not specified */
  detached?: boolean;
  /** Additional environment variables */
  env?: Record<string, string>;
  /** A letter representing the container size for running the command */
  size?: string;
}

export type RunResponse = ContainerProcess & {
  /** The url to attach to this one-off, if relevant */
  attach_url: string;
  /** The parent app of this one-off */
  app: App;
};
