import {pki} from 'node-forge'
const {RSA_PRIVATE_KEY, RSA_PUBLIC_KEY} = process.env

export function encrypt(data: string) {
    return pki.publicKeyFromPem(RSA_PUBLIC_KEY.replace(/\\n/g, '\n')).encrypt(data)
}

export function decrypt(data: string) {
    return pki.privateKeyFromPem(RSA_PRIVATE_KEY.replace(/\\n/g, '\n')).decrypt(data)
}