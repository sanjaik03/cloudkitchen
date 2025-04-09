import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/Storecontext"; 
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
    const context = useContext(StoreContext);

    if (!context) {
        console.error("StoreContext is null! Make sure StoreContextProvider is wrapping this component.");
        return <p>Loading...</p>; 
    }

    const { food_list } = context;

    return (
        <div className="food-display" id="food-display">
            <h2>Top dishes</h2>
            <div className="food-display-list">
                {food_list?.map((item, index) => (
                    <FoodItem
                        key={index}
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default FoodDisplay;
