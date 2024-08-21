import * as yup from 'yup'


export const validationSchema = yup.object({
  name: yup.string().required('This field is required'),
  email: yup.string().email('Enter a valid email').required('This field is required'),
  mobile: yup.number().positive().required('This field is required'),
  
})