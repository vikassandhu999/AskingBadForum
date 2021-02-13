export interface LoginCustomerDTO {
    email: string;
    password: string;
}

export interface LoginCustomerResponseDTO {
    accessToken: string;
    refreshToken: string;
}