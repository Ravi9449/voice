import React, { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Dashoboard from "./Dashboard/Dashboard";
import History from "./History/History";
import Tracker from "./Tracker/Tracker";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function App() {


  const commands = [
    {
      command: ["`Go to * page", "Go to *", "Open * page", "Open *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });
  const [redirectUrl, setRedirectUrl] = useState(" ");
  const [redirect,setredirect] = useState("")
  const [errorpath,seterrorpath] = useState("")

  useEffect(()=>{
    // console.log("inside looper",window.location.pathname,redirect)
    if(redirect)
      if(window.location.pathname !== redirect){
        window.location.href = redirect
      }
    // <Navigate to={redirect} />
  },[redirect])

  const pages = ["dashboard", "history", "tracker"];
  
  const urls = {
    dashboard: "/",
    history: "/history",
    tracker: "/tracker",
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  let errortext = "";
  if (redirectUrl) {
    if(redirectUrl !== undefined && urls[redirectUrl] !== undefined){
      if (pages.includes(redirectUrl)) {
        if(redirect !== urls[redirectUrl])
        setredirect(urls[redirectUrl])
        // redirect = <Navigate to={urls[redirectUrl]} />;
      } else {
        seterrorpath(`Could not find page: ${redirectUrl}`);
      }
    }else{
      errortext = `Could not find page: ${redirectUrl}`
    }
  }


  return (
    <div>
      <BrowserRouter>
        <nav>
          <h1>The Clothing Company</h1>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/history">History</NavLink>
          <NavLink to="/tracker">Tracker</NavLink>
        </nav>
        <Routes>
          <Route path="/" exact element={<Dashoboard />} />
          <Route path="/history" exact element={<History />} />
          <Route path="/tracker" exact element={<Tracker />} />
        </Routes>
        {errortext}
      </BrowserRouter>
      <p id="transcript">Transcript: {transcript}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
    </div>
  );
}

export default App;
