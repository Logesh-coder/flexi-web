import * as yup from 'yup';

const parseDate = (value: string) => {
    const [year, month, day] = value.split('-');
    return new Date(`${year}-${month}-${day}`);
};

const today = new Date();
const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

export const profileSchema = yup.object().shape({
    name: yup.string().required('Name is required'),

    mobile: yup
        .string()
        .required('Mobile is required')
        .matches(/^[0-9]{10}$/, 'Mobile must be 10 digits'),

    date_of_birth: yup
        .string()
        .required('Date of birth is required')
        .test('age', 'You must be at least 18 years old', (value) => {
            if (!value) return false;
            const parsed = parseDate(value);
            return parsed <= minAgeDate;
        }),

    city: yup.string().required('City is required'),
    area: yup.string().required('Area is required'),
    domain: yup.string().required('Work domain is required'),
    salary: yup
        .number()
        .typeError('Salary must be a number')
        .min(250, 'Minimum salary is 250')
        .required('Salary is required'),
});
