import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';

@Injectable()
export class EncryptionService {
  async generateKeys(
    phone: string,
    passphrase: string,
  ): Promise<{ publicKey: string }> {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });
    if (!fs.existsSync('./keys/' + phone)) {
      fs.mkdirSync('./keys/' + phone, { recursive: true });
      console.log(`Directory '${'./keys/' + phone}' created.`);
    }
    fs.writeFileSync('./keys/' + phone + '/private.pem', privateKey);
    fs.writeFileSync('./keys/' + phone + '/public.pem', publicKey);
    return { publicKey };
  }
  checkSignature(phone: string, hash: string): string {
    try {
      const res: string = fs
      .readFileSync('./keys/' + phone + '/private.pem', 'utf8')
      .toString();

    return this.decrypt(hash, res);
    } catch (error) {
      throw new Error("Не удалось проверить подпись");
      
    }

  }
  encrypt(data, publicKey: string) {
    const buffer = Buffer.from(data);
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
  }
  decrypt(encryptedData, privateKey: string) {
    const buffer = Buffer.from(encryptedData, 'base64');
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      buffer,
    );
    return decrypted.toString();
  }
}
