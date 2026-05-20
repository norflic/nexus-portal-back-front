import {z} from "zod";

export const DefenseZod = z.object({
    id: z.number(),
    date: z.coerce.date(),
    company_id: z.number(),
    room: z.string(),
    student_id: z.number(),
    company_member_id: z.number(),
    candid_teacher_id: z.number(),
    tech_teacher_id: z.number()
});

export type Defense = z.infer<typeof DefenseZod>;

const DefenseCompanyLiteZod = z.object({
    id: z.number(),
    name: z.string(),
}).passthrough();

const DefenseUserLiteZod = z.object({
    id: z.number(),
    name: z.string(),
}).passthrough();

export const DefenseCascadeZod = z.object({
    id: z.number().optional(),
    date: z.coerce.date(),
    company: z.nullable(DefenseCompanyLiteZod),
    room: z.string(),
    student: z.nullable(DefenseUserLiteZod),
    company_member: z.nullable(DefenseUserLiteZod),
    candid_teacher: z.nullable(DefenseUserLiteZod),
    tech_teacher: z.nullable(DefenseUserLiteZod)
});

export type DefenseCascade = z.infer<typeof DefenseCascadeZod>;
