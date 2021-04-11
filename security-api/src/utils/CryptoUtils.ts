import {pki} from 'node-forge'
const {RSA_PRIVATE_KEY, RSA_PUBLIC_KEY,SECRET} = process.env

export function encrypt(data: string) {
    return pki.publicKeyFromPem(RSA_PUBLIC_KEY.replace(/\\n/g, '\n')).encrypt(data)
}