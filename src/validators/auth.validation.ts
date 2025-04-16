import * as yup from 'yup';

export const userNameValidation = yup
    .string()
    .required('Name is Required')
    .min(3, 'Name must be at least 3 letters')
    .max(50, 'Name must be at most 50 letters')
    .matches(/^[A-Za-z\s]+$/, 'Name must contain only letters and space');

export const passwordValidation = yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .test(
        'uppercase-test',
        'Password must contain at least one uppercase letter',
        (value) => /[A-Z]/.test(value)
    )
    .test(
        'lowercase-test',
        'Password must contain at least one lowercase letter',
        (value) => /[a-z]/.test(value)
    )
    .test('number-test', 'Password must contain at least one number', (value) =>
        /\d/.test(value)
    )
    .test(
        'special-char-test',
        'Password must contain at least one special character',
        (value) => /[@$!%*?&]/.test(value)
    );

export const phoneNumberValidation = yup
    .string()
    .required('Phone Number is Required')
    .matches(/^[0-9]/, 'Invalid Phone Number')
    .length(10, 'Phone Number must have 10 digits');

export const emailValidation = yup
    .string()
    .required('Email is required')
    .test(
        'includes-at',
        ({ value }) =>
            `Please include an @ in the email address. "${value}" is missing an @.`,
        (value) => (value ? value.includes('@') : false)
    )
    .test(
        'valid-domain',
        ({ value }) =>
            `Please enter a part following "@", "${value}" is incomplete.`,
        (value) => {
            if (!value) return false;
            const parts = value.split('@');
            return parts.length > 1 && parts[1].trim() !== '';
        }
    )
    .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Invalid Email Format.')

export const dateOfBirthValidation = yup
    .date()
    .required('Date of Birth is required')
    .max(new Date(), 'Date of Birth cannot be in the future')
    .test(
        'age-limit',
        'You must be at least 18 years old',
        (value) => {
            if (!value) return false;
            const today = new Date();
            const birthDate = new Date(value);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age >= 18;
        }
    );

export const registerValidator = yup.object({
    name: userNameValidation,
    email: emailValidation,
    mobile: phoneNumberValidation,
    password: passwordValidation,
    date_of_birth: dateOfBirthValidation
})

export const loginValidator = yup.object({
    email: emailValidation,
    password: yup.string().required('Password is required'),
})

export const forgotValidator = yup.object({
    email: emailValidation,
})

export const resetValidator = yup.object({
    password: passwordValidation,
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
});


export const jobPostSchema = yup.object().shape({
    title: yup
        .string()
        .required('Job title is required')
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title cannot exceed 100 characters')
        .trim(),

    description: yup
        .string()
        .min(10, 'Description must be at least 10 characters')
        .max(2000, 'Description cannot exceed 2000 characters')
        .trim(),


    budget: yup
        .string()
        .required('Budget is required')
        .test(
            'min-amount',
            'Minimum budget must be ₹250',
            (value) => {
                if (!value) return false;

                const numbers = value.match(/\d+/g)?.map(Number) || [];
                if (numbers.length === 0) return false;

                return Math.min(...numbers) >= 250;
            }
        ),


    date: yup
        .string()
        .required('Date is required')
        .test(
            'future-date',
            'Date cannot be in the past',
            (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                // Set time to 00:00:00 for both
                selectedDate.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);
                return selectedDate >= today;
            }
        ),


    durationStartTime: yup
        .string()
        .required('Start time is required')
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Start time must be a valid time in HH:mm format'),

    durationEndTime: yup
        .string()
        .required('End time is required')
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'End time must be a valid time in HH:mm format'),


    area: yup
        .string()
        .required('Area is required')
        .min(3, 'Area must be at least 3 characters')
        .max(100, 'Area cannot exceed 100 characters')
        .trim(),

    city: yup
        .string()
        .required('City is required')
        .min(3, 'City must be at least 3 characters')
        .max(50, 'City cannot exceed 50 characters')
        .trim(),

    landMark: yup
        .string()
        .required('Landmark is required')
        .min(5, 'Landmark must be at least 5 characters')
        .max(200, 'Landmark cannot exceed 200 characters')
        .trim(),
});