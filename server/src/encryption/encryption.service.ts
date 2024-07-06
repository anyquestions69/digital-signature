import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';

@Injectable()
export class EncryptionService {
  async generateKeys(
    phone: string,
    passphrase: string,
  ): Promise<{ publicKey: string; privateKey: string }> {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: passphrase,
      },
    });
    if (!fs.existsSync('./keys/' + phone)) {
      fs.mkdirSync('./keys/' + phone, { recursive: true });
      console.log(`Directory '${'./keys/' + phone}' created.`);
    } else {
      console.log(`Directory '${'./keys/' + phone}' already exists.`);
    }
    fs.writeFile('./keys/' + phone + '/private.pem', privateKey, (err) => {
      if (err) {
        console.error(`Failed to write file: ${err}`);
      } else {
        console.log('File written successfully.');
      }
    });
    fs.writeFile('./keys/' + phone + '/public.pem', publicKey, (err) => {
      if (err) {
        console.error(`Failed to write file: ${err}`);
      } else {
        console.log('File written successfully.');
      }
    });
    return { publicKey, privateKey };
  }
  encrypt(data, publicKey: string) {
    const buffer = Buffer.from(data);
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
  }
  decrypt(encryptedData, privateKey: string) {
    const buffer = Buffer.from(encryptedData, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString();
  }
}
