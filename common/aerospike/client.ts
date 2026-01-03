import Aerospike from 'aerospike';

const config = {
  hosts: '127.0.0.1:3000', // change if needed
  policies: {
    timeout: 1000,
  },
};

let client = Aerospike.client(config); // create client

export async function initAerospike() {
  await client.connect();
  console.log('✅ Aerospike connected');
}

export function getAerospikeClient() {
  if (!client) throw new Error('Aerospike client not initialized');
  return client;
}
