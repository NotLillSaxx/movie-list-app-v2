import react, { useState, useEffect, lazy, Suspense } from "react";
import { Loader } from "components";
import "./App.css";

const LazyAppBody = lazy(() => import("components/appBody/appBody.js"));

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  
  useEffect(() => {
    // checking the width of the website so we determine if we should show the error page or no
    setWindowWidth(window.innerWidth);

    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // adding listener to the resize event so we set the page width value
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return windowWidth > 425 ? (
    <div className="app-error">
      <h1>
        This was only mobile app view website, please switch to an mobile view to
        continue using the application
      </h1>
    </div>
  ) : (
    <div className="body-container">
      <div className="items-container">
        <Suspense fallback={<Loader />}>
          <LazyAppBody />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
