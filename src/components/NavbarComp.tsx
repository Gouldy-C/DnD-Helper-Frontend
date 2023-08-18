import { useContext } from "react";
import { Link} from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { IoPersonSharp } from 'react-icons/io5';
import { useForm } from "react-hook-form";



export default function NavbarComp(){
  const { register, handleSubmit } = useForm()
  const onSubmit = handleSubmit(data => console.log(data))
  const onChange = handleSubmit(data => console.log(data))
  const {user}= useContext(UserContext)
  
  
  return (
    
    <div className="rounded-b-xl navbar bg-neutral-focus">
      <div className="navbar-start">
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral-focus rounded-xl w-52 ">
            {user.username ?
              <>
                <li><Link to={'/'}>Homepage</Link></li>
                <li><Link to={"/"}>About</Link></li>
                <li><Link to={"/character-builder"}>Character Builder</Link></li>
              </> 
              :
              <>
                <li><Link to={'/'}>Homepage</Link></li>
                <li><Link to={"/"}>About</Link></li>
                <li><Link to={"/login"}>Login</Link></li>
                <li><Link to={"/sign-up"}>Sign Up</Link></li>
              </>
            }
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to={"/"} className="text-xl normal-case btn btn-ghost rounded-3xl">D&D Helper</Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-hover dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </label>
          <form className="dropdown-content mt-4 z-[1] shadow bg-neutral-focus rounded-xl w-80 relative">
            <input type="text" placeholder="Type here" onChange={onChange} onSubmit={onSubmit} className="w-full pr-12 text-black prmax-w-xs bg-slate-50 rounded-xl input input-bordered placeholder:text-gray-500 input-secondary" />
            <button type='submit' className="absolute right-0 btn btn-ghost btn-circle hover:btn-base">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="black"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          </form>
        </div>
        {user.username &&
        <div className="dropdown dropdown-hover dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="flex justify-center w-10 rounded-full justify-items-center">
                <IoPersonSharp className="h-10 m-auto text-xl" />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-neutral-focus rounded-xl w-52">
            <li><Link to={"/"}>Profile</Link></li>
            <li><Link to={"/"}>Settings</Link></li>
            <li><Link to={"/logout"}>Logout</Link></li>
          </ul>
        </div>}
      </div>
    </div>

  );
}
