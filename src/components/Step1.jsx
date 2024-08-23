import { useContext } from "react"
import stepContext from "../stepContext"

export default function Step1({formik}) {


  const activeStep = useContext(stepContext)

  const { values, errors, touched, handleBlur, handleChange } = formik
  
    return (
      activeStep.step === 1 &&
        <section className="md:w-5/6">
          <h1 className="text-4xl font-bold text-MarineBlue my-3">Personal Info</h1>
          <p className="text-CoolGray">Please provide your name, email address, and phone number</p>

          {/* name input */}
          <div className="mt-5 flex flex-col justify-start gap-2">
            <label htmlFor='name' className="text-MarineBlue text-sm font-semibold flex justify-between items-center">
              Name {errors.name && touched.name && <h4 className="text-red-600 text-xs">{errors.name}</h4>}
            </label>
            <input type="text" name="name" id="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. John Doe"
              className={`outline-none border-2 rounded-lg p-3 text-MarineBlue font-semibold ${errors.name && touched.name ? 'border-red-600' : 'border-LightGray'}`}
            />
          </div>

          {/* email input */}
          <div className="mt-5 flex flex-col justify-start gap-2">
            <label htmlFor='email' className="text-MarineBlue text-sm font-semibold flex justify-between items-center">
              Email Address {errors.email && touched.email && <h4 className="text-red-600 text-xs">{errors.email}</h4>}
            </label>
            <input type="email" name="email" id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. johndoe@lorem.com"
              className={`outline-none border-2 rounded-lg p-3 text-MarineBlue font-semibold ${errors.email && touched.email ? 'border-red-600' : 'border-LightGray'}`}
            />
          </div>

          {/* mobile number input */}
          <div className="mt-5 flex flex-col justify-start gap-2">
            <label htmlFor='mobile' className="text-MarineBlue text-sm font-semibold flex justify-between items-center">
              Phone Number {errors.mobile && touched.mobile && <h4 className="text-red-600 text-xs">{errors.mobile}</h4>}
            </label>
            <input type="tel" name="mobile" id="mobile"
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. +1 234 567 890"
              className={`outline-none border-2 rounded-lg p-3 text-MarineBlue font-semibold ${errors.mobile && touched.mobile ? 'border-red-600' : 'border-LightGray'}`}
            />
          </div>
        </section>
  )
}
