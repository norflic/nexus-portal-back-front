
export function UserNotFound(identity?: string) {
    return identity ?
    `No user with identity: ${identity} was found.` : 
    `User not Found.`
}