import { act, useContext, useState } from "react"
import stepContext from "../stepContext"
import { useFormik } from "formik"
import { plans, addOns } from "../constants"
import thankYou from '../assets/images/icon-thank-you.svg'
import { validationSchema } from "../schema"

function Form() {


  const activeStep = useContext(stepContext)

  const [yearly, setYearly] = useState(false)

  const [finished, setFinished] = useState(false)


  function validateStep1() {

    setTouched({
      name: true,
      email: true,
      mobile: true,
    })

    validateForm().then(result => (result.name || result.email || result.mobile) ? '' : activeStep.nextStep())
  }


  function toggleYearly() {
    setYearly((prev) => !prev)
  }


  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit, validateForm, setTouched } = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      plan: 'Arcade',
      addOns: []
    },
    validationSchema: validationSchema,
    onSubmit: async () => {

      await new Promise((resolve) => setTimeout(resolve, 2000))
      setFinished(true)
    }
  })


  return (
    <form className="p-6 w-full flex flex-col justify-between items-center" onSubmit={handleSubmit}>

      {/* =============== step 1 =============== */}
      {activeStep.step === 1 &&
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
            <input type="text" name="mobile" id="mobile"
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. +1 234 567 890"
              className={`outline-none border-2 rounded-lg p-3 text-MarineBlue font-semibold ${errors.mobile && touched.mobile ? 'border-red-600' : 'border-LightGray'}`}
            />
          </div>
        </section>}


      {/* =============== step 2 =============== */}
      {activeStep.step === 2 &&
        <section className="md:w-5/6">
          <h1 className="text-4xl font-bold text-MarineBlue my-3">Select your plan</h1>
          <p className="text-CoolGray">You have the option of monthly or yearly billing</p>

          {/* cards container */}
          <div className="w-full flex justify-between mt-10">

            {/* cards */}
            {plans.map((plan) => (
              <label key={plan.title} className="w-[30%] max-w-[150px] cursor-pointer">
                <input type="radio" name='plan'
                  value={plan.title}
                  checked={values.plan === plan.title}
                  onChange={handleChange}
                  className="hidden" />
                <div className={`p-4 border rounded-lg hover:border-PurplishBlue ${values.plan === plan.title ? 'border-PurplishBlue bg-Alabaster' : 'border-LightGray'}`}>
                  <img src={plan.icon} alt={plan.title} />
                  <div className="mt-12">
                    <h2 className="text-MarineBlue font-bold text-[18x]">{plan.title}</h2>
                    <h2 className="text-CoolGray text-sm">{yearly ? `$${plan.yearlyPrice}/yr` : `$${plan.monthlyPrice}/mo`}</h2>
                    {yearly && <h2 className="text-xs text-MarineBlue mt-1.5 font-semibold ">2 months free</h2>}
                  </div>
                </div>
              </label>
            ))}

          </div>

          {/* monthly/yearly billing */}
          <div className="flex justify-center items-center gap-2 mt-10 p-3 bg-Alabaster rounded-xl">
            <h3 className={`font-bold ${yearly ? 'text-CoolGray' : 'text-MarineBlue'} cursor-pointer`} onClick={toggleYearly}>Monthly</h3>
            <div className={`w-9 bg-MarineBlue rounded-full p-1 cursor-pointer flex ${yearly ? 'flex-row-reverse' : 'flex-row'}`} onClick={toggleYearly}>
              <div className="w-3 h-3 rounded-full bg-white" />
            </div>
            <h3 className={`font-bold ${yearly ? 'text-MarineBlue' : 'text-CoolGray'} cursor-pointer`} onClick={toggleYearly}>Yearly</h3>
          </div>

        </section>}

      {/* =============== step 3 =============== */}
      {activeStep.step === 3 &&
        <section className="md:w-5/6">
          <h1 className="text-4xl font-bold text-MarineBlue my-3">Pick add-ons</h1>
          <p className="text-CoolGray">Add-ons help enhance your gaming experience</p>

          {/* container */}
          <div className="w-full flex flex-col justify-between mt-10">

            {/* map through add-ons array and create checkboxes inputs */}
            {addOns.map((addOn) => (
              <label key={addOn.title} className={`cursor-pointer border border-LightGray hover:border-PurplishBlue ${values.addOns.some((item) => addOn.title === item) ? 'border-PurplishBlue bg-Mangolia' : ''} flex justify-start items-center py-4 px-5 mt-3 rounded-lg`}>

                <input type="checkbox" name="addOns" value={addOn.title}
                  className="mr-5 w-[20px] h-[20px] accent-PurplishBlue"
                  checked={values.addOns.some((item) => addOn.title === item)}
                  onChange={handleChange} />

                <div className="flex items-center justify-between w-full">
                  <div>
                    <h3 className="font-bold text-MarineBlue">{addOn.title}</h3>
                    <p className="text-sm text-CoolGray">{addOn.text}</p>
                  </div>
                  <div className="text-PurplishBlue font-semibold">
                    {yearly ? `+$${addOn.yearlyPrice}/yr` : `+$${addOn.monthlyPrice}/mo`}
                  </div>
                </div>
              </label>
            ))
            }

          </div>
        </section>}

      {/* =============== step 4 =============== */}
      {activeStep.step === 4 && !finished &&
        <section className="md:w-5/6">
          <h1 className="text-4xl font-bold text-MarineBlue my-3">Finishing up</h1>
          <p className="text-CoolGray">Double check everything looks OK before confirming</p>

          {/* container */}
          <div className="w-full mt-10 bg-Mangolia rounded-lg px-6">

            {/* selected plan */}
            <div className={`flex justify-between items-center ${values.addOns.length > 0 ? 'border-b' : ''} border-LightGray py-5`}>
              <div className="flex flex-col">
                <h3 className="text-MarineBlue font-semibold">
                  {`${values.plan} (${yearly ? 'Yearly' : 'Monthly'})`}
                </h3>
                <button type="button" className="w-fit underline text-PurplishBlue text-sm font-semibold hover:opacity-80" onClick={() => activeStep.changeStep(2)}>Change</button>
              </div>
              <h3 className="text-MarineBlue font-bold text-lg">
                {`$${(plans.find((plan) => plan.title === values.plan))[yearly ? 'yearlyPrice' : 'monthlyPrice']}/${yearly ? 'yr' : 'mo'}`}
              </h3>
            </div>

            {/* selected add-ons */}
            <div className={`flex flex-col justify-between gap-4 ${values.addOns.length > 0 ? 'py-5' : ''} text-CoolGray`}>
              {addOns.map((addOn) => (
                values.addOns.some((item) => addOn.title === item) &&
                <div key={addOn.title} className="flex justify-between">
                  <h3 className="font-semibold">{addOn.title}</h3>
                  <h3 className="text-MarineBlue font-semibold">{`+$${addOn[yearly ? 'yearlyPrice' : 'monthlyPrice']}/${yearly ? 'yr' : 'mo'}`}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* total bill */}
          <div className="bg-white px-6 py-5 flex justify-between">
            <h3 className="text-CoolGray text-sm font-semibold">Total ({yearly ? 'per year' : 'per month'})</h3>
            <h3 className="text-xl font-bold text-PurplishBlue">+${eval(`${plans.find((plan) => plan.title === values.plan)[yearly ? 'yearlyPrice' : 'monthlyPrice']
              } 
          +
           ${
              // map on add-ons array and get the price of each add-on that exists in the form values (inputs that user checked)
              // then filter out null elements then join all elements with ( + ) to evaluate the sum of all prices
              (addOns.map((addOn) =>
                (values.addOns.some((item) => (item === addOn.title)) ? addOn[yearly ? 'yearlyPrice' : 'monthlyPrice'] : null))
                .filter((element) => element)
                .join('+')) || 0

              }`)}/{yearly ? 'yr' : 'mo'}
            </h3>
          </div>
        </section>}

      {/* buttons */}
      {!finished &&
        <div className="relative md:w-5/6 h-[64px]">
          {activeStep.step > 1 && <button type="button" disabled={isSubmitting} className="disabled:opacity-40 text-CoolGray hover:text-MarineBlue focus:text-MarineBlue font-semibold w-[120px] p-2.5 rounded-lg left-0 bottom-0 absolute" onClick={activeStep.prevStep}>Go Back</button>}
          {activeStep.step < 4 && <button type="button" className="bg-MarineBlue hover:bg-blue-900 focus:bg-blue-900 text-white font-semibold w-[120px] p-2.5 rounded-lg right-0 bottom-0 absolute" onClick={validateStep1}>Next Step</button>}
          {activeStep.step === 4 && <button type="submit" disabled={isSubmitting} className="disabled:opacity-40 bg-PurplishBlue hover:opacity-80 focus:opacity-80 text-white font-semibold w-[120px] p-2.5 rounded-lg right-0 bottom-0 absolute">Confirm</button>}
        </div>}

      {/* thank you */}
      {finished &&
        <section className="md:w-5/6 h-full flex justify-center items-center">
          <div className="flex flex-col items-center">
            <img src={thankYou} alt="thanks" className="mb-9" />
            <h1 className="text-MarineBlue text-4xl font-bold">Thank you!</h1>
            <p className="text-center text-CoolGray mt-4 w-10/12">
              Thanks for confirming you subscription! we hope you have
              fun using our platform. If you ever need support, please feel
              free to eamil us at support@loremgaming.com
            </p>
          </div>
        </section>}
    </form>
  )
}

export default Form