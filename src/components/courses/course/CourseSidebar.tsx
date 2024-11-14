import { useState } from "react";
import { useSelector } from "react-redux";
import { Rating } from 'react-simple-star-rating';
import { selectCourses } from "../../../redux/features/courseSlice";

// Interface for Filter Criteria
interface FilterCriteria {
   level: string;
   // category: string;
   // language: string;
   // price: string;
   // rating: number | null;
   // skill: string;
   // instructor: string;
}

const CourseSidebar = ({ setCourses }: any) => {
   const [levelSelected, setLevelSelected] = useState('');
   // const [categorySelected, setCategorySelected] = useState('');
   // const [languageSelected, setLanguageSelected] = useState('');
   // const [priceSelected, setPriceSelected] = useState('');
   // const [skillSelected, setSkillSelected] = useState('');
   // const [instructorSelected, setInstructorSelected] = useState('');
   // const [ratingSelected, setRatingSelected] = useState<number | null>(null);

   const allCourses = useSelector(selectCourses);

   // Handle level selection
   const handleLevel = (level: string) => {
      setLevelSelected(prevLevel => prevLevel === level ? '' : level);
      filterCourses({ level: level === levelSelected ? '' : level });
   };

   // Filter courses based on selected criteria
   const filterCourses = ({ level }: FilterCriteria) => {
      let filteredCourses = allCourses;

      if (level) {
         filteredCourses = filteredCourses.filter(course => course.skill_level === level);
      }

      setCourses(filteredCourses);
   };

   return (
      <div className="col-xl-3 col-lg-4">
         <aside className="courses__sidebar">
            {/* Level Filter */}
            <div className="courses-widget">
               <h4 className="widget-title">Level</h4>
               <div className="courses-cat-list">
                  <ul className="list-wrap">
                     {["Beginner", "Intermediate", "Advanced"].map((level, i) => (
                        <li key={i}>
                           <div onClick={() => handleLevel(level)} className="form-check">
                              <input
                                 className="form-check-input"
                                 type="checkbox"
                                 checked={level === levelSelected}
                                 readOnly
                                 id={`level_${i}`}
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor={`level_${i}`}
                                 onClick={() => handleLevel(level)}
                              >
                                 {level}
                              </label>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Commented out code for extra filters */}
            {/* <div className="courses-widget">
               <h4 className="widget-title">Categories</h4>
               <div className="courses-cat-list">
                  <ul className="list-wrap">
                     {categoriesToShow.map((category, i) => (
                        <li key={i}>
                           <div onClick={() => handleCategory(category)} className="form-check">
                              <input
                                 className="form-check-input"
                                 type="checkbox"
                                 checked={category === categorySelected}
                                 readOnly
                                 id={`cat_${i}`}
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor={`cat_${i}`}
                                 onClick={() => handleCategory(category)}
                              >
                                 {category}
                              </label>
                           </div>
                        </li>
                     ))}
                  </ul>
                  <div className="show-more">
                     <a
                        className={`show-more-btn ${showMoreCategory ? 'active' : ''}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowMoreCategory(!showMoreCategory)}
                     >
                        {showMoreCategory ? "Show Less -" : "Show More +"}
                     </a>
                  </div>
               </div>
            </div> */}

            {/* Additional commented-out filters like Language, Price, etc. */}
            {/* Feel free to uncomment and adjust as needed */}
         </aside>
      </div>
   );
}

export default CourseSidebar;
