import zod from 'zod';

export const FileStoreModelZod = zod.object({
    id: zod.number(),
    filename: zod.string(),
    email: zod.email(),
    file_contents: zod.base64()
});

export const CreateFileStoreModelZod = FileStoreModelZod.omit({id: true});

