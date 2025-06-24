import { Client } from "..";
import { Project } from "../models/regional/projects";
import {
  CreateParams,
  UpdateParams,
} from "../params/regional/projects";
import { unpackData } from "../utils";

/**
 * Projects API Client
 */
export default class Projects {
  /** Scalingo API Client */
  _client: Client;

  /**
   * Create a new "thematic" client
   * @param client Scalingo API Client
   */
  constructor(client: Client) {
    this._client = client;
  }

  /**
   * Get all projects for the current user
   * @return Promise that when resolved returns a Project array.
   */
  all(): Promise<Project[]> {
    return unpackData(this._client.apiClient().get("/projects"), "projects");
  }

  /**
   * Fetch a specific project
   * @param id ID of the project
   * @return Promise that when resolved returns a Project.
   */
  find(id: string): Promise<Project> {
    return unpackData(
      this._client.apiClient().get(`/projects/${id}`),
      "project",
    );
  }

  /**
   * Create a new project
   * @param payload Project creation parameters
   * @return Promise that when resolved returns the created Project.
   */
  create(payload: CreateParams): Promise<Project> {
    return unpackData(
      this._client.apiClient().post("/projects", { project: payload }),
      "project",
    );
  }

  /**
   * Update a project
   * @param id ID of the project
   * @param payload Project update parameters
   * @return Promise that when resolved returns the updated Project.
   */
  update(id: string, payload: UpdateParams): Promise<Project> {
    return unpackData(
      this._client.apiClient().patch(`/projects/${id}`, { project: payload }),
      "project",
    );
  }
}
