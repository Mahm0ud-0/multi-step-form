import { useContext } from 'react'
import stepContext from '../stepContext'
import { plans } from '../constants'

export default function Step2({formik, yearState}) {


    const activeStep = useContext(stepContext)

    const { values, handleChange } = formik
  
    
    
   return (
    activeStep.step === 2 &&
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
                    <h2 className="text-CoolGray text-sm">{yearState.yearly ? `$${plan.yearlyPrice}/yr` : `$${plan.monthlyPrice}/mo`}</h2>
                    {yearState.yearly && <h2 className="text-xs text-MarineBlue mt-1.5 font-semibold">2 months free</h2>}
                  </div>
                </div>
              </label>
            ))}

          </div>

          {/* monthly/yearly billing */}
          <div className="flex justify-center items-center gap-2 mt-10 p-3 bg-Alabaster rounded-xl">
            <h3 className={`font-bold ${yearState.yearly ? 'text-CoolGray' : 'text-MarineBlue'} cursor-pointer`} onClick={yearState.toggleYearly}>Monthly</h3>
            <div className={`w-9 bg-MarineBlue rounded-full p-1 cursor-pointer flex ${yearState.yearly ? 'flex-row-reverse' : 'flex-row'}`} onClick={yearState.toggleYearly}>
              <div className="w-3 h-3 rounded-full bg-white" />
            </div>
            <h3 className={`font-bold ${yearState.yearly ? 'text-MarineBlue' : 'text-CoolGray'} cursor-pointer`} onClick={yearState.toggleYearly}>Yearly</h3>
          </div>

        </section>

  )
}
