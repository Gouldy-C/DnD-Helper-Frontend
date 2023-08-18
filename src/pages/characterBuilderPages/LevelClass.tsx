import { useEffect, useRef, useState } from "react"




export default function LevelClass({header}:{header:string}) {
  const classIndex = 1
  const [optionsList, setOptionsList] = useState<Object[]>([])
  const [defaultClass, setDefaultClass] = useState<string>(sessionStorage.getItem(`class${classIndex}`) ? sessionStorage.getItem(`class${classIndex}`)as string : 'default')
  const [levelValue, setLevelValue] = useState<string>(sessionStorage.getItem(`classLevel${classIndex}`) ? sessionStorage.getItem(`classLevel${classIndex}`)as string :'1')
  const [classInfo, setClassInfo] = useState<Object>()
  const [levelData, setLevelData] = useState<Object[]>()
  
  const classRef = useRef<HTMLSelectElement>(null)
  const classLevelRef = useRef<HTMLInputElement>(null)
  
  const getClasses = () => {
    fetch(`https://www.dnd5eapi.co/api/classes`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      const emptyList: Object[] = []
      data.results.map((r:{[name:string]:string}) => {
        emptyList.push({'value' : r.url, 'label': r.name, 'index': r.index})
        setOptionsList(emptyList)
      })
    })
  }
  
  const getClassesInfo = () => {
    fetch(`https://www.dnd5eapi.co/api/classes/${sessionStorage.getItem(`class${classIndex}`)}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      setClassInfo(data)
    })
  }

  const getLevelInfo = () => {
    fetch(`https://www.dnd5eapi.co/api/classes/${sessionStorage.getItem(`class${classIndex}`)}/levels`)
      .then(response => {
        return response.json()})
      .then(data => {
        setLevelData(data)
      });
  }

  
  
  function classChange() {
    setDefaultClass(classRef.current!.value)
    sessionStorage.setItem(`class${classIndex}`, classRef.current!.value)
  }
  function levelChange() {
    sessionStorage.setItem(`classLevel${classIndex}`, classLevelRef.current!.value)
    setLevelValue(classLevelRef.current?.value as string)
  }
  
  useEffect(() => {
    sessionStorage.setItem(`classLevel${classIndex}`, classLevelRef.current!.value)
    getClasses()
  }, [])

  
  useEffect(() => {
    getClassesInfo()
  }, [defaultClass])
  
  useEffect(() => {
    getLevelInfo()
  }, [classInfo])
  

  console.log(levelData);
  
  return (
  <>
    <h2 className='my-5 text-4xl text-center underline underline-offset-8 text-primary-content sm:text-5xl'>{header}</h2>
    <form className="my-8" method="POST">
      <div className="flex flex-wrap justify-evenly">
        <div className="w-64 mx-5 mt-4 md:text-xl">
          <div className="flex justify-between">
            <label
              className="block font-medium leading-6 text-primary-content">
              Class level
            </label>
            <label
              className="block font-medium leading-6 text-primary-content">
              {levelValue}
            </label>
          </div>
          <div className="mt-2">
            <input
              onChange={() => levelChange()}
              type="range"
              ref={classLevelRef}
              min={1}
              max={20}
              step={1}
              defaultValue={levelValue}
              className="range"
            />
          </div>
        </div>
        <div className="w-64 mx-5 mt-4 md:text-xl">
          <label
            className="block font-medium leading-6 text-primary-content">
            Class
          </label>
          <div className="mt-2">
            <select
              onChange={() => classChange()}
              ref={classRef}
              value={defaultClass}
              className="block w-full rounded-md border-0 py-1.5 px-3 bg-white text-black shadow-sm sm:leading-6">
                <option className="text-gray-500" disabled value={'default'}>Pick your Class</option>
                {optionsList.length > 0 && optionsList.map((option) => {
                  return <option key={option.index} value={option.index}>{option.label}</option>
                })}
            </select>
          </div>
        </div>
      </div>
    </form>
    {defaultClass !== 'default' &&
    <>
      <div className="mt-10 shadow-xl bg-cyan-950 card sm:card-side">
        <div className="p-3 card-body md:text-xl">
          <h2 className="card-title md:text-2xl">{classInfo?.name}</h2>
          <div className="flex">
            {classInfo?.subclasses && classInfo?.subclasses.length > 0 && <p>{classInfo?.subclasses[0]?.name}</p>}
            {classInfo?.hit_die && <p>Hit Die: d{classInfo?.hit_die}</p>}
            <div className="flex">
              <p className="mx-3">Saving Throws:</p>
              {classInfo?.saving_throws && classInfo?.saving_throws.map((ability) => {
                return <p className="mx-3" key={ability.index}>{ability.name}</p>
              })}
            </div>
          </div>
          <p>Proficiencies:</p>
          <div  className="flex flex-wrap">
            {classInfo?.proficiencies && classInfo?.proficiencies.map((prof, i) => {
                return i < classInfo?.proficiencies.length - 2 && <li className="mx-5 " key={prof.index}>{prof.name}</li>
              })}
          </div>
          <p>Skill Proficiencies Choices:</p>
          <p className="ms-5">{classInfo?.proficiency_choices && classInfo?.proficiency_choices[0].desc}</p>
          
          <p>Starting Equipment:</p>
          {classInfo?.starting_equipment && classInfo?.starting_equipment.map((e) => {
                return <li className="mx-5 " key={e.equipment.index}>{e.equipment.name}</li>
              })}
          <p>Equipment Choices:</p>
          {classInfo?.starting_equipment_options && classInfo?.starting_equipment_options.map((e, i) => {
                return <li className="mx-5 " key={e.desc}>{e.desc}</li>
              })}
        </div>
      </div>
      {levelData && levelData[0]?.spellcasting && 
        <div className="mt-10 overflow-x-auto rounded bg-cyan-950">
          <h2 className="text-center">Spell Slots Per Lvl</h2>
          <table className="table">
            <thead>
              <tr>
                <th>{classInfo && classInfo.name} lvl</th>
                <th>{levelData[19].spellcasting.spells_known >= 0 ? 'Max Known': ''}</th>
                <th>{levelData[19].spellcasting.cantrips_known >= 0 ? 'Cantrips': ''}</th>
                <th>{levelData[19].spellcasting.spell_slots_level_1 >= 0 ? 'lvl 1': ''}</th>
                <th>{levelData[19].spellcasting.spell_slots_level_2 >= 0 ? 'lvl 2': ''}</th>
                <th>{levelData[19].spellcasting.spell_slots_level_3 >= 0 ? 'lvl 3': ''}</th>
                <th>{levelData[19].spellcasting.spell_slots_level_4 >= 0 ? 'lvl 4': ''}</th>
                <th>{levelData[19].spellcasting.spell_slots_level_5 >= 0 ? 'lvl 5': ''}</th>
                <th>{levelData[19].spellcasting.spell_slots_level_6 >= 0 ? 'lvl 6': ''}</th>
                <th>{levelData[19].spellcasting.spell_slots_level_7 >= 0 ? 'lvl 7': ''}</th>
                <th>{levelData[19].spellcasting.spell_slots_level_8 >= 0 ? 'lvl 8': ''}</th>
                <th>{levelData[19].spellcasting.spell_slots_level_9 >= 0 ? 'lvl 9': ''}</th>
              </tr>
            </thead>
            <tbody>
              {levelData.map((lvl) => {
                return(
                <tr key={lvl.level} className="py-2">
                  <th lassName="py-2">{lvl.level}</th>
                  <td lassName="py-2">{lvl.spellcasting.spells_known ? lvl.spellcasting.spells_known : ''}</td>
                  <td lassName="py-2">{lvl.spellcasting.cantrips_known ? lvl.spellcasting.cantrips_known : ''}</td>
                  <td lassName="py-2">{lvl.spellcasting.spell_slots_level_1 ? lvl.spellcasting.spell_slots_level_1 : ''}</td>
                  <td lassName="py-2">{lvl.spellcasting.spell_slots_level_2 ? lvl.spellcasting.spell_slots_level_2 : ''}</td>
                  <td lassName="py-2">{lvl.spellcasting.spell_slots_level_3 ? lvl.spellcasting.spell_slots_level_3 : ''}</td>
                  <td lassName="py-2">{lvl.spellcasting.spell_slots_level_4 ? lvl.spellcasting.spell_slots_level_4 : ''}</td>
                  <td lassName="py-2">{lvl.spellcasting.spell_slots_level_5 ? lvl.spellcasting.spell_slots_level_5 : ''}</td>
                  <td lassName="py-2">{lvl.spellcasting.spell_slots_level_6 ? lvl.spellcasting.spell_slots_level_6 : ''}</td>
                  <td lassName="py-2">{lvl.spellcasting.spell_slots_level_7 ? lvl.spellcasting.spell_slots_level_7 : ''}</td>
                  <td lassName="py-2">{lvl.spellcasting.spell_slots_level_8 ? lvl.spellcasting.spell_slots_level_8 : ''}</td>
                  <td lassName="py-2">{lvl.spellcasting.spell_slots_level_9 ? lvl.spellcasting.spell_slots_level_9 : ''}</td>
                </tr>)}
              )}
            </tbody>
          </table>
        </div>
      }
    {/* {classInfo?.traits && classInfo?.traits.length > 0 && (
      <div className="my-6 md:text-xl">
        {Object.values(traitsCollection).map(trait => (
          <div className="my-1" key={trait.index}>
            <div className="collapse collapse-plus bg-cyan-950">
              <input type="radio" name="my-accordion-3" />
              <div className="text-xl font-medium collapse-title md:text-2xl">
                {trait.name}
              </div>
              <div className="collapse-content">
                <p>{trait.desc}</p>
              </div>
            </div>
          </div>
        ))}
        {classInfo?.ability_bonus_options && (
          <div className="my-1" key={'abo'}>
            <div className="collapse collapse-plus bg-cyan-950">
              <input type="radio" name="my-accordion-3" />
              <div className="text-xl font-medium collapse-title md:text-2xl">
                Ability Score Increase
              </div>
              <div className="collapse-content">
                <p>Your Charisma score increases by 2, and two other ability scores of your choice increase by 1.</p>
              </div>
            </div>
          </div>
        )}
        {classInfo?.language_options && (
          <div className="my-1" key={'lo'}>
            <div className="collapse collapse-plus bg-cyan-950">
              <input type="radio" name="my-accordion-3" />
              <div className="text-xl font-medium collapse-title md:text-2xl">
                Bonus Languages
              </div>
              <div className="collapse-content">
                <p>{classInfo?.language_desc}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    )} */}
    </>
    }
  </>
)}