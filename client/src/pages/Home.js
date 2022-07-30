import { useState } from "react";
//components
import Signup from "../components/Signup";
import Login from "../components/Login";
//HOME component
export default function Home() {
  let [loginEnable, setLoginEnable] = useState(false);
  const handleShowLogin = () => {
    setLoginEnable((prev) => !prev);
  };
  return (
    <main>
      {loginEnable ? <Login login={handleShowLogin} /> : null}
      <div className='main-description'>
        <h1>ZOHO CRM</h1>
        <img
          src='https://www.thesmbguide.com/images/zoho-crm-420x320-20201009.png'
          alt='logo'
        />
      </div>
      <Signup login={handleShowLogin} />
    </main>
  );
}
