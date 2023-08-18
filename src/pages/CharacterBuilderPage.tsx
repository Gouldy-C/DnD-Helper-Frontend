
import NameRace from './characterBuilderPages/NameRace'
import LevelClass from "./characterBuilderPages/LevelClass";
import AbilityScores from "./characterBuilderPages/AbilityScores";
import { useState } from "react";

export default function CharacterBuilderPage() {
  const [activeTab, setActiveTab] = useState(0);
  function handleTabClick(tabIndex: number) {
    setActiveTab(tabIndex);
  };

  function renderTabContent() {
    switch (activeTab) {
      case 0:
        return <NameRace key={0} header={'Name and Race'}/>;
      case 1:
        return <LevelClass key={1} header={'Class and Level'}/>;
      case 2:
        return <AbilityScores key={2}/>;
      case 3:
        return <AbilityScores key={3}/>;
      case 4:
        return <AbilityScores key={4}/>;
      default:
        return null;
    }
  };

  
  return (
  <>
    <div className="container px-5 sm:px-10">
    
      <h1 className='py-10 text-5xl text-center'>Character Builder</h1>
      
      <div className="flex justify-center tabs">
        <button
          className={`tab tab-bordered mt-3 ${activeTab === 0 ? "tab-active" : ""} md:tab-lg`}
          onClick={() => handleTabClick(0)}>
          Name / Race
        </button>
        <button
          className={`tab tab-bordered mt-3 ${activeTab === 1 ? "tab-active" : ""} md:tab-lg`}
          onClick={() => handleTabClick(1)}>
          Class / Level
        </button>
        <button
          className={`tab tab-bordered mt-3 ${activeTab === 2 ? "tab-active" : ""} md:tab-lg`}
          onClick={() => handleTabClick(2)}>
            Ability Scores
        </button>
        <button
          className={`tab tab-bordered mt-3 ${activeTab === 3 ? "tab-active" : ""} md:tab-lg`}
          onClick={() => handleTabClick(3)}>
            Description
        </button>
        <button
          className={`tab tab-bordered mt-3 ${activeTab === 4 ? "tab-active" : ""} md:tab-lg`}
          onClick={() => handleTabClick(4)}>
            Equipment
        </button>
      </div>
      <div className="flex flex-col justify-center flex-1 min-h-full pb-12 lg:px-8">
        <div className="p-5 mb-10 rounded-lg shadow-2xl bg-neutral-focus sm:mx-auto sm:w-full sm:max-w-3xl">
          <div className='flex justify-between mb-6'>
            {activeTab !== 0 &&
            <button
              type="submit"
              onClick={() => handleTabClick(activeTab - 1)}
              className="flex justify-center w-28 rounded-md bg-cyan-950 px-3 py-1.5 font-semibold leading-6 text-primary-content text-base shadow-sm hover:bg-cyan-900 me-auto">
                <svg className='mr-2' width="13" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#ffffff" d="m4.431 12.822l13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"/>
                </svg>Back
            </button>}
            {activeTab !== 4 &&
            <button
              type="submit"
              onClick={() => handleTabClick(activeTab + 1)}
              className="flex w-28 rounded-md bg-cyan-950 px-3 py-1.5 font-semibold leading-6 text-primary-content text-base shadow-sm hover:bg-cyan-900 justify-center ms-auto">
              Next<svg className='ml-2' width="13" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#ffffff" d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z"/>
                  </svg>
            </button>}
          </div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  
  
  </>

  )
}
