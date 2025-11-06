import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import { Loader } from "../shared";

import { MapConstructor } from "./MapConstructor.jsx";

// function App() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Снимаем "loading", когда всё загрузилось
//     const handleLoad = () => {
//       setTimeout(() => { setLoading(false); }, 100);
//     };

//     if (document.readyState === "complete") {
//       // Страница уже загружена
//       setLoading(false);
//     } else {
//       // Ждём событие load
//       window.addEventListener("load", handleLoad);
//     }

//     return () => window.removeEventListener("load", handleLoad);
//   }, []);

  

//   console.log("App component rendering...");
  
//   return (
//     <BrowserRouter>
//       {loading ? <Loader /> : <AuthProvider />}
//     </BrowserRouter>
//   );
// }

function App() {
  return (
      <BrowserRouter>
        <MapConstructor/>
      </BrowserRouter>  
    )
}

export default App;
