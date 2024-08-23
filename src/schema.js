import * as yup from 'yup'


const mobileRegEx = /^(\+?\d{1,3}?[- ]?)?\d{10}$/


export const validationSchema = yup.object({
  name: yup.string().required('This field is required'),
  email: yup.string().email('Enter a valid email').required('This field is required'),
  mobile: yup.string().matches(mobileRegEx, {message: 'Enter a valid phone number'}).required('This field is required'),
  
})