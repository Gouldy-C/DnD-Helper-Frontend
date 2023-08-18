import { useRef, useState } from "react"

export default function AbilityScores() {
  const [optionsList, setOptionsList] = useState<Array<number>>([8,10,12,13,14,15])
  const [selectedList, setSelectedList] = useState<Array<number>>([])
  const strRef = useRef<HTMLSelectElement>(null)
  const dexRef = useRef<HTMLSelectElement>(null)
  const conRef = useRef<HTMLSelectElement>(null)
  const intRef = useRef<HTMLSelectElement>(null)
  const wisRef = useRef<HTMLSelectElement>(null)
  const chaRef = useRef<HTMLSelectElement>(null)

  function strChange() {
    // if (strRef.current!.value !== '-' && ){
      
    // }
    sessionStorage.setItem('strScore', strRef.current!.value)
    setSelectedList((p) => [...p, Number(strRef.current!.value)]) 
    strRef.current!.value = strRef.current!.value
  }

  return (
    <div className="flex flex-wrap justify-evenly">
      <div className='mx-2'>
        <p>Strength</p>
        <select
          onChange={() => strChange()}
          ref={strRef}
          value={sessionStorage.getItem('strScore')? Number(sessionStorage.getItem('strScore')):'-'}
          className=" rounded-md border-0 py-1.5 px-3 bg-white text-black shadow-sm sm:leading-6 w-20">
            <option className="text-gray-500" disabled value={'-'}>-</option>
            {optionsList.length > 0 && optionsList.map((option) => {
              return <option key={option} value={option}>{option}</option>
            })}
        </select>
      </div>
      <div className='mx-2'>
        <p>Dexterity</p>
        <select
          onChange={() => strChange()}
          ref={dexRef}
          value={sessionStorage.getItem('dexScore')? Number(sessionStorage.getItem('dexScore')):'-'}
          className="rounded-md border-0 py-1.5 px-3 bg-white text-black shadow-sm sm:leading-6 w-20">
            <option className="text-gray-500" disabled value={'-'}>-</option>
            {optionsList.length > 0 && optionsList.map((option) => {
              return <option key={option} value={option}>{option}</option>
            })}
        </select>
      </div>
      <div className='mx-2'>
        <p>Constitution</p>
        <select
          onChange={() => strChange()}
          ref={conRef}
          value={'-'}
          className="rounded-md border-0 py-1.5 px-3 bg-white text-black shadow-sm sm:leading-6 w-20">
            <option className="text-gray-500" disabled value={'-'}>-</option>
            {optionsList.length > 0 && optionsList.map((option) => {
              return <option key={option} value={option}>{option}</option>
            })}
        </select>
      </div>
      <div className='mx-2'>
        <p>Intelligence</p>
        <select
          onChange={() => strChange()}
          ref={intRef}
          value={'-'}
          className="rounded-md border-0 py-1.5 px-3 bg-white text-black shadow-sm sm:leading-6 w-20">
            <option className="text-gray-500" disabled value={'-'}>-</option>
            {optionsList.length > 0 && optionsList.map((option) => {
              return <option key={option} value={option}>{option}</option>
            })}
        </select>
      </div>
      <div className='mx-2'>
        <p>Wisdom</p>
        <select
          onChange={() => strChange()}
          ref={wisRef}
          value={'-'}
          className="rounded-md border-0 py-1.5 px-3 bg-white text-black shadow-sm sm:leading-6 w-20">
            <option className="text-gray-500" disabled value={'-'}>-</option>
            {optionsList.length > 0 && optionsList.map((option) => {
              return <option key={option} value={option}>{option}</option>
            })}
        </select>
      </div>
      <div className='mx-2'>
        <p>Charisma</p>
        <select
          onChange={() => strChange()}
          ref={chaRef}
          value={'-'}
          className="rounded-md border-0 py-1.5 px-3 bg-white text-black shadow-sm sm:leading-6 w-20">
            <option className="text-gray-500" disabled value={'-'}>-</option>
            {optionsList.length > 0 && optionsList.map((option) => {
              return <option key={option} value={option}>{option}</option>
            })}
        </select>
      </div>
    </div>
  )
}
