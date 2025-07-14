export interface auth {
    name: string
    mobile: number
    date_of_birth: Date
    email: string
    password: string
    confirmPassword: string;
}
export interface ProfileFormValues {
    name: string;
    email: string;
    mobile: string;
    date_of_birth: string;
    domain: string;
    salary: string;
    city: string;
    area: string;
    isActive?: boolean;
}