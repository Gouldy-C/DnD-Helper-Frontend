import { useEffect, useRef, useState } from "react"

interface RaceObject{
  value : string
  label : string
  index : string
}


export default function NameRace({header}:{header:string}) {
  const [optionsList, setOptionsList] = useState<RaceObject[]>([])
  const [defaultRace, setDefaultRace] = useState<string>(sessionStorage.getItem('characterRace') ? sessionStorage.getItem('characterRace')as string : 'default')
  const [defaultName] = useState<string>(sessionStorage.getItem('characterName') ? sessionStorage.getItem('characterName')as string : '')
  const [raceInfo, setRaceInfo] = useState<RaceInfoFetch | undefined>()
  const [traitsCollection, setTraitsCollection] = useState<{[name:string]:TraitInfoFetch}>({})
  
  const raceRef = useRef<HTMLSelectElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  
  const getRaces = () => {
    fetch(`https://www.dnd5eapi.co/api/races`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      const emptyList:RaceObject[] = []
      data.results.map((r:{[name:string]:string}) => {
        emptyList.push({'value' : r.url, 'label': r.name, 'index': r.index})
        setOptionsList(emptyList)
      })
    })
  }
  
  const getRacesInfo = () => {
    fetch(`https://www.dnd5eapi.co/api/races/${sessionStorage.getItem('characterRace')}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      setRaceInfo(data)
    })
  }

  const getTraitInfo = (url: string) => {
    fetch(`https://www.dnd5eapi.co${url}`)
      .then(response => response.json())
      .then(data => {
        setTraitsCollection(prevTraits => ({
          ...prevTraits,
          [data.index]: data
        }));
      })
      .catch(error => {
        console.error("Error fetching trait info:", error);
      });
  };
  
  
  function raceChange() {
    setDefaultRace(raceRef.current!.value)
    sessionStorage.setItem('characterRace', raceRef.current!.value)
  }
  function nameChange() {
    sessionStorage.setItem('characterName', nameRef.current!.value)
  }
  
  useEffect(() => {
    getRaces()
  }, [])

  
  useEffect(() => {
    getRacesInfo()
  }, [defaultRace])
  
  
  useEffect(() => {
    setTraitsCollection({})
    if(raceInfo?.traits && raceInfo.traits.length > 0){
      raceInfo?.traits.map((trait) => getTraitInfo(trait.url))
    } else {
      setTraitsCollection({});
    }
  }, [raceInfo])
  
  
  return (
  <>
    <h2 className='my-5 text-4xl text-center underline underline-offset-8 text-primary-content sm:text-5xl'>{header}</h2>
    <form className="my-8" method="POST">
      <div className="flex flex-wrap justify-evenly">
        <div className="w-64 mx-5 mt-4 md:text-xl">
          <label
            className="block font-medium leading-6 text-primary-content">
            Character Name
          </label>
          <div className="mt-2">
            <input
              onChange={() => nameChange()}
              type="text"
              ref={nameRef}
              defaultValue={defaultName}
              placeholder="Characters name"
              className="block w-full rounded-md border-0 py-1.5 px-3 bg-white text-black shadow-sm placeholder:text-gray-500 sm:leading-6"
            />
          </div>
        </div>
        <div className="w-64 mx-5 mt-4 md:text-xl">
          <label
            className="block font-medium leading-6 text-primary-content">
            Character Race
          </label>
          <div className="mt-2">
            <select
              onChange={() => raceChange()}
              ref={raceRef}
              value={defaultRace}
              className="block w-full rounded-md border-0 py-1.5 px-3 bg-white text-black shadow-sm sm:leading-6">
                <option className="text-gray-500" disabled value={'default'}>Pick your Race</option>
                {optionsList.length > 0 && optionsList.map((option) => {
                  return <option key={option.index} value={option.index}>{option.label}</option>
                })}
            </select>
          </div>
        </div>
      </div>
    </form>
    {defaultRace !== 'default' &&
      <div className="mt-10 shadow-xl bg-cyan-950 card sm:card-side">
        <div className="p-3 card-body md:text-xl">
          <h2 className="card-title md:text-2xl">{raceInfo?.name}</h2>
          <div className="flex">
            {raceInfo?.subraces && raceInfo?.subraces.length > 0 && <p key={'subRace'}>{raceInfo?.subraces[0]?.name}</p>}
            <p key={'speed'}>Speed: {raceInfo?.speed}</p>
            {raceInfo?.ability_bonuses && raceInfo?.ability_bonuses.map((ability) => {
              return <p key={ability.index}>{ability.ability_score.name}: +{ability.bonus}</p>
            })}
          </div>
          <p>Age:</p>
          <p className="ms-5">{raceInfo?.age}</p>
          <p>Known Languages:</p>
          <p className="ms-5">{raceInfo?.language_desc}</p>
          <p>Size:</p>
          <p className="ms-5">{raceInfo?.size_description}</p>
          <p>Alignment:</p>
          <p className="ms-5">{raceInfo?.alignment}</p>
        </div>
      </div>}
      <div className="my-6 md:text-xl">
        {raceInfo?.traits && raceInfo?.traits.length > 0 && Object.values(traitsCollection).map(trait => (
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
        {raceInfo?.ability_bonus_options && (
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
        {raceInfo?.language_options && (
          <div className="my-1" key={'lo'}>
            <div className="collapse collapse-plus bg-cyan-950">
              <input type="radio" name="my-accordion-3" />
              <div className="text-xl font-medium collapse-title md:text-2xl">
                Bonus Languages
              </div>
              <div className="collapse-content">
                <p>{raceInfo?.language_desc}</p>
              </div>
            </div>
          </div>
        )}
      </div>
  </>
)}

