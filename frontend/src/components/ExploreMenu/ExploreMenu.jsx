import React from 'react';
import './ExploreMenu.css';
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
    // Handle clicking on a menu category
    const handleCategoryClick = (categoryName) => {
        setCategory(categoryName);
        
        // Scroll to the food display section
        const foodDisplaySection = document.getElementById('food-display-section');
        if (foodDisplaySection) {
            foodDisplaySection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'>Discover a variety of delicious dishes, crafted with the finest ingredients to satisfy your cravings.</p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    return (
                        <div 
                            key={index} 
                            className={`explore-menu-list-item ${category === item.menu_name ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(item.menu_name)}
                        >
                            <img src={item.menu_image} alt={item.menu_name} />
                            <p>{item.menu_name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ExploreMenu;