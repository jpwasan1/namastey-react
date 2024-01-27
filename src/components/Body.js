import RestaurauntCard from "./RestaurauntCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

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

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return (
      <h1>
        Looks like you're offline!! Please check your internet connection;
      </h1>
    );
  }

  // Conditional Rendering
  return listOfRestauraunts.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-1 bg-green-100 m-4 rounded-lg"
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
        <div className="search m-4 p-4 flex items-center">
        <button
          className="px-4 py-2 bg-gray-100 rounded-lg"
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
        
      </div>
      <div className="flex flex-wrap">
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
