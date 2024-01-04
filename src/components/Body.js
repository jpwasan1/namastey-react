import RestaurauntCard from "./RestaurauntCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  // Local State Variable - Super powerful variable
  let [listOfRestauraunts, setListOfRestauraunt] = useState([]);
  let [filteredRestauraunt, setFilteredRestauraunt] = useState([]);
  let [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    // Optional Chaining
    setListOfRestauraunt(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestauraunt(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  // Conditional Rendering
  return listOfRestauraunts.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              //Filter the restauraunt  cards and update the ui

              const filteredRestauraunt = listOfRestauraunts.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setFilteredRestauraunt(filteredRestauraunt);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestauraunts.filter(
              (res) => res.info.avgRatingString > 4
            );
            setListOfRestauraunt(filteredList);
          }}
        >
          Top Rated Restauraunts
        </button>
      </div>
      <div className="restauraunt-container">
        {filteredRestauraunt.map((restauraunt) => (
          <Link
            key={restauraunt.info.id}
            to={"/restauraunts/" + restauraunt.info.id}
          >
            <RestaurauntCard restaurauntData={restauraunt} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
