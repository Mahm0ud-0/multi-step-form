import { useContext } from "react"
import stepContext from "../stepContext"
import { plans, addOns } from "../constants"


export default function Step4({formik, yearly, finished}) {

    const activeStep = useContext(stepContext)

    const { values } = formik

    
    
    return (
    activeStep.step === 4 && !finished &&
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
        </section>
  )
}
