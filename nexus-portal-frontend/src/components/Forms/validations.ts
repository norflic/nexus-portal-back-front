export const validateEmail = (email: string): string | undefined => {
    if (email === "") return "L'email est requis";
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return !emailRegex.test(email) ? "L'email n'est pas valide" : undefined;
};