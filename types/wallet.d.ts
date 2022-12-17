interface NoncePayload {
    walletAddress: string;
}

interface NonceResponse {
    nonce: string;
}

interface LinkPayload {
    sessionTicket: string;
    walletAddress: string;
    signature: string;
}

interface LinkResponse {}

declare namespace Wallet {
    namespace Nonce {
        type Payload = NoncePayload;
        type Response = NonceResponse;
    }

    namespace Link {
        type Payload = LinkPayload;
        type Response = LinkResponse;
    }
}
