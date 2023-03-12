import React, { useState } from "react";
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
      command: ["Go to * page", "Go to *", "Open * page", "Open *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });
  const [redirectUrl, setRedirectUrl] = useState(" ");
  const pages = ["dashboard", "history", "tracker"];
  const urls = {
    dashboard: "/",
    history: "/history",
    tracker: "/tracker",
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  let redirect = "";
  if (redirectUrl) {
    console.log(redirectUrl);
    if (pages.includes(redirectUrl)) {
      redirect = <Navigate to={urls[redirectUrl]} />;
    } else {
      redirect = <p>Could not find page: {redirectUrl}</p>;
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
        {redirect}
      </BrowserRouter>
      <p id="transcript">Transcript: {transcript}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
    </div>
  );
}

export default App;
