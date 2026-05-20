import {DefenseZod} from "../../models/Defense";
import zod from "zod";

export const AddDefenseFormValuesZod = DefenseZod.omit({id: true});

export type AddDefenseFormValues = zod.infer<typeof AddDefenseFormValuesZod>;
