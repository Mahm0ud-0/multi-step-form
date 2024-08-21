import { useState } from "react"
import Steps from './components/Steps'
import Form from './components/Form'
import stepContext from "./stepContext"

function App() {

  const [step, setStep] = useState(1)


  function nextStep() {
    setStep((prev) => prev + 1)
  }

  function prevStep() {
    setStep((prev) => prev - 1)
  }

  function changeStep(s) {
    setStep(s)
  }


  return (
    <main className="flex h-screen w-screen justify-center items-center bg-Mangolia">
      <div className="w-full md:w-2/3 bg-white flex p-4 rounded-xl">
        <stepContext.Provider value={{ step, nextStep, prevStep, changeStep }}>
          <Steps />
          <Form />
        </stepContext.Provider>
      </div>
    </main>
  )
}

export default App
