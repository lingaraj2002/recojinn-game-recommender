import { useState, useEffect } from "react";
import Loader from "./Loader";
import Chat from "./Chat";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return loading ? <Loader /> : <Chat />;
}

export default App;
