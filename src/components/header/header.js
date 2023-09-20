import react, { useState, useRef, useEffect } from "react";
import "./header.css";
import { debounce } from "utils";

function Header({ setSearchKey }) {
  const [showInputBar, setShowInputBar] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [addSticky, setAddSticky] = useState(false);

  // to limit the number of set state by using debounce
  const delayedSetSearchValue = useRef(
    debounce((text) => setSearchKey(text), 500)
  ).current;

  useEffect(() => {
    // adding listener to the scrolling event
    document.addEventListener("scroll", handleScrolling);
    return () => window.removeEventListener("scroll", handleScrolling);
  }, []);

  // to change the nav bar style based on the scrolling
  const handleScrolling = () => {
    if (!addSticky && window.pageYOffset > 50) {
      setAddSticky(true);
    } else if (window.pageYOffset < 50) {
      setAddSticky(false);
    }
  };

  const handleInputBar = () => {
    setShowInputBar(!showInputBar);
  };

  // to handle set search value
  const handleSearchValue = (e) => {
    let { value } = e?.target;

    if (value == undefined) {
      return;
    }

    setSearchValue(value);
    delayedSetSearchValue(value);
  };

  // to handle the press of back button
  const handleBackButton = () => {
    if (showInputBar) {
      setShowInputBar(false);
      setSearchValue("");
      delayedSetSearchValue("");
    }

    /*

    to handle other possible cases

    */
  };

  return (
    <div className={`header-container ${addSticky ? "header-sticky" : ""}`}>
      <div>
        <img
          onClick={handleBackButton}
          src="https://test.create.diagnal.com/images/Back.png"
        />
        {!showInputBar && <h3 className="header-title">Romantic Comedy</h3>}
      </div>

      <div className={showInputBar ? "input-search-shrink" : ""}>
        {showInputBar ? (
          <input
            className="search-bar"
            type="text"
            placeholder="Enter the moive name"
            value={searchValue}
            onChange={handleSearchValue}
            

          />
        ) : (
          <img
            onClick={handleInputBar}
            src="https://test.create.diagnal.com/images/search.png"
          />
        )}
      </div>
    </div>
  );
}

export default Header;
