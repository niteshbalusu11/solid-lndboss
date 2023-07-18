import { HttpException, Logger } from '@nestjs/common';
import { algorithm, encryptionKey } from './constants';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const hexAsBuffer = (hex: string) => Buffer.from(hex, 'hex');

// Logger for throwing http errors
export const httpLogger = ({ error }: { error: any }) => {
  Logger.error(error);
  const err = {
    error: error,
  };

  throw new HttpException(err, 503);
};

// Encrypt a string
export const encryptString = ({
  text,
}: {
  text: string;
}): { iv?: string; encryptedData?: string; error?: string } => {
  try {
    const iv = randomBytes(16);
    const cipher = createCipheriv(algorithm, hexAsBuffer(encryptionKey), iv);
    const encryptedData = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
      iv: iv.toString('hex'),
      encryptedData: encryptedData.toString('hex'),
    };
  } catch (error) {
    return { error };
  }
};

// Decrypt a string
export const decryptString = ({
  iv,
  encryptedData,
}: {
  iv: string;
  encryptedData: string;
}): { decryptedData?: string; error?: any } => {
  try {
    const decipher = createDecipheriv(
      algorithm,
      hexAsBuffer(encryptionKey),
      Buffer.from(iv, 'hex'),
    );
    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(encryptedData, 'hex')),
      decipher.final(),
    ]);

    return {
      decryptedData: decrpyted.toString(),
    };
  } catch (error) {
    return { error };
  }
};
