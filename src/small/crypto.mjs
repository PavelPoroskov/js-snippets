import crypto from 'node:crypto';

const hash = text => crypto.createHash('sha256').update(text).digest('hex');
