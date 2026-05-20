import bcrypt from 'bcrypt'

const hashPassword = async (plainPassword: string): Promise<string> => {
    const salt = await bcrypt.genSalt(12)

    const hashedPassword = await bcrypt.hash(plainPassword, salt)
    return hashedPassword
}

const verifyPassword = async (plainTextPassword: string, encryptedPassword: string): Promise<boolean> => {
    const isPasswordMatching = bcrypt.compare(plainTextPassword, encryptedPassword);
    return isPasswordMatching
}

const PasswordService = {
    hashPassword,
    verifyPassword
}

export default PasswordService