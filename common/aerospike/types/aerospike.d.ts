declare module 'aerospike' {
    export interface AerospikeClient {
      connect(): Promise<void>;
      put(ns: string, set: string, key: any, record: any): Promise<void>;
      get(ns: string, set: string, key: any): Promise<any>;
      // Add more specific typings as you use them
    }
  
    const Aerospike: {
      client(config: any): AerospikeClient;
    };
  
    export = Aerospike;
  }
  