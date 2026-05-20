
import zod from "zod"


export const LoginModelZod = zod.object({
    email: zod.email(),
    password: zod.string()
});

export type LoginModel = zod.infer<typeof LoginModelZod>