import { Client } from "..";
import { unpackData } from "../utils";
import { Project } from "../models/regional/projects";
import { CreateProjectParams, UpdateProjectParams } from "../params/regional/projects";

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
   * @param id ID or UUID of the project
   * @return Promise that when resolved returns a Project.
   */
  find(id: string): Promise<Project> {
    return unpackData(this._client.apiClient().get(`/projects/${id}`), "project");
  }

  /**
   * Create a new project
   * @param payload Project creation parameters
   * @return Promise that when resolved returns the created Project.
   */
  create(payload: CreateProjectParams): Promise<Project> {
    return unpackData(
      this._client.apiClient().post("/projects", { project: payload }),
      "project"
    );
  }

  /**
   * Update a project
   * @param id ID or UUID of the project
   * @param payload Project update parameters
   * @return Promise that when resolved returns the updated Project.
   */
  update(id: string, payload: UpdateProjectParams): Promise<Project> {
    return unpackData(
      this._client.apiClient().patch(`/projects/${id}`, { project: payload }),
      "project"
    );
  }

  /**
   * Destroy the given project.
   * @param id ID or UUID of the project
   * @return Promise that resolves when the project is deleted.
   */
  destroy(id: string): Promise<void> {
    return unpackData(
      this._client.apiClient().delete(`/projects/${id}`)
    );
  }
}
