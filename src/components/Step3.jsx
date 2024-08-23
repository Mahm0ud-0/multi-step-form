import { useContext } from "react";
import { addOns } from "../constants";
import stepContext from "../stepContext";


export default function Step3({formik, yearly}) {


    const activeStep = useContext(stepContext)

    const { values, handleChange } = formik
  
    
    
  return (
    activeStep.step === 3 &&
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
        </section>
  )
}
