import zod from "zod";

export const UserZod = zod.object({
    id: zod.number(),
    firstname: zod.string(),
    lastname: zod.string(),
    email: zod.email(),
    tel: zod.string(),
    password: zod.string(),
    user_type: zod
        .enum(["secretary", "year_manager", "cursus_manager", "student", "teacher", "company_member"])
        .optional()
        .nullable(),
    is_admin: zod.boolean().default(false),
    managed_year: zod.string().nullable().optional(),
    student_status: zod.enum(["intern", "apprentice"]).nullable().optional(),
    company_id: zod.number().nullable().optional(),
    settings_id: zod.number().optional(),
    job_title: zod.string().nullable().optional(),
    class_group: zod.string().nullable().optional(),
    cursus: zod.enum(["RA", "DACS", "AGED"]).nullable().optional(),
    year: zod.number().nullable().optional()
});

export type User = zod.infer<typeof UserZod>;
