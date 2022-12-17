interface LoginPayload {
    email: string;
    password: string;
}

interface LoginResponse {
    SessionTicket: string;
}

interface SignupPayload {
    email: string;
    password: string;
}

interface SignupResponse {
    SessionTicket: string;
}

interface Session {
    sessionTicket: string;
}

declare namespace Auth {
    namespace Login {
        type Payload = LoginPayload;
        type Response = LoginResponse;
    }

    namespace Signup {
        type Payload = SignupPayload;
        type Response = SignupResponse;
    }

    type Session = Session;
}
