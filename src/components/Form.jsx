import { useContext, useState } from "react"
import stepContext from "../stepContext"
import { useFormik } from "formik"
import { plans, addOns } from "../constants"
import thankYou from '../assets/images/icon-thank-you.svg'
import { validationSchema } from "../schema"
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"
import Step4 from "./Step4"

function Form() {


  const activeStep = useContext(stepContext)

  const [yearly, setYearly] = useState(false)

  const [finished, setFinished] = useState(false)


  function validateStep1() {

    formik.setTouched({
      name: true,
      email: true,
      mobile: true,
    })

    formik.validateForm().then(result => (result.name || result.email || result.mobile) ? '' : activeStep.nextStep())
  }


  function toggleYearly() {
    setYearly((prev) => !prev)
  }


  const formik = useFormik({
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
    <form className="p-6 w-full flex flex-col justify-between items-center" onSubmit={formik.handleSubmit}>

      {/* =============== step 1 =============== */}
      <Step1 formik={formik}/>

      {/* =============== step 2 =============== */}
      <Step2 formik={formik} yearState={{yearly, toggleYearly}}/>


      {/* =============== step 3 =============== */}
      <Step3 formik={formik} yearly={yearly}/>


      {/* =============== step 4 =============== */}
      <Step4 formik={formik} yearly={yearly} finished={finished}/>


      {/* buttons */}
      {!finished &&
        <div className="relative md:w-5/6 h-[64px]">
          {activeStep.step > 1 && <button type="button" disabled={formik.isSubmitting} className="disabled:opacity-40 text-CoolGray hover:text-MarineBlue focus:text-MarineBlue font-semibold w-[120px] p-2.5 rounded-lg left-0 bottom-0 absolute" onClick={activeStep.prevStep}>Go Back</button>}
          {activeStep.step < 4 && <button type="button" className="bg-MarineBlue hover:bg-blue-900 focus:bg-blue-900 text-white font-semibold w-[120px] p-2.5 rounded-lg right-0 bottom-0 absolute" onClick={validateStep1}>Next Step</button>}
          {activeStep.step === 4 && <button type="submit" disabled={formik.isSubmitting} className="disabled:opacity-40 bg-PurplishBlue hover:opacity-80 focus:opacity-80 text-white font-semibold w-[120px] p-2.5 rounded-lg right-0 bottom-0 absolute">Confirm</button>}
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