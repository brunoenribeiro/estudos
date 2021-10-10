import * as crypto from 'crypto';

class Transaction {
  constructor(
    public amount: number,
    public payer: string,
    public payee: string,
  ) {}

  toString() {
    return JSON.stringify(this);
  }
}

class Block {
  public nounce = Math.round(Math.random() * 999999999);

  constructor(
    public prevHash: string | null,
    public transation: Transaction,
    public ts = Date.now(),
  ) {}

  get hash() {
    const str = JSON.stringify(this);
    const hash = crypto.createHash("SHA256");
    hash.update(str).end();
    return hash.digest('hex');
  }
}

class Chain {
  public static instance = new Chain();

  chain: Block[];

  constructor() {
    this.chain = [new Block(null, new Transaction(100, 'genesis', 'satoshi'))]
  }

  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(transation: Transaction, senderPublicKey: string, signature: Buffer) {
    const verifier = crypto.createVerify('SHA256');
    verifier.update(transation.toString());

    const isValid = verifier.verify(senderPublicKey, signature);

    if (isValid) {
      const newBlock = new Block(this.lastBlock.hash, transation);
      this.mine(newBlock.nounce);
      this.chain.push(newBlock);
    }
  }

  mine(nounce: number) {
    let solution = 1;
    console.log('mining...');

    while (true) {
      const hash = crypto.createHash('MD5');
      hash.update((nounce + solution).toString()).end();

      const attempt = hash.digest('hex');

      if(attempt.substr(0, 4) === '0000') {
        console.log(`Solved: ${solution}`);
        return solution;
      }

      solution++;
    }
  }
}

class Wallet {
  public publicKey: string;
  public privateKey: string;

  constructor() {
    const keyPair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });

    this.publicKey = keyPair.publicKey;
    this.privateKey = keyPair.privateKey;
  }

  sendMoney(amount: number, payeePublicKey: string) {
    const transation = new Transaction(amount, this.publicKey, payeePublicKey);

    const sign = crypto.createSign('SHA256');
    sign.update(transation.toString()).end();

    const signature = sign.sign(this.privateKey);

    Chain.instance.addBlock(transation, this.publicKey, signature);
  }
}

// Example usage
const satoshi = new Wallet();
const bob = new Wallet();
const alice = new Wallet();

satoshi.sendMoney(50, bob.publicKey);
bob.sendMoney(23, alice.publicKey);
alice.sendMoney(5, bob.publicKey);

console.log(Chain.instance);
