import { HDSContact } from "src/models/regional";

export type UpdateParams = Partial<
  Omit<HDSContact, "id" | "updated_at" | "up_to_date">
>;
