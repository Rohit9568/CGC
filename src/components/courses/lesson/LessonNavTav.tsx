import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Overview from "../course-details/Overview";
import Reviews from "../course-details/Reviews";
import Instructors from "../course-details/Instructors";
import InstructorQuiz from "../../../pages/InstructorQuiz";

type LessonNavTavProps = {
   content: any;
};

const tab_title: string[] = ["Overview", "Attempt Quiz", "Instructors", "Reviews"];

const LessonNavTav = ({ content }: LessonNavTavProps) => {
   const [activeTab, setActiveTab] = useState(0);
   const navigate = useNavigate(); // Hook to navigate between pages
   const { uniqueCode } = useParams();

   const handleTabClick = (index: number) => {
      setActiveTab(index);

      // Navigate to the quiz page if "Attempt Quiz" is clicked (index 1)
      if (index === 1) {
         navigate(`/quiz/${uniqueCode}`); // Replace "/quiz" with the path of your quiz page
      }
   };

   return (
      <div className="courses__details-content lesson__details-content">
         <ul className="nav nav-tabs" id="myTab" role="tablist">
            {tab_title.map((tab, index) => (
               <li key={index} onClick={() => handleTabClick(index)} className="nav-item" role="presentation">
                  <button className={`nav-link ${activeTab === index ? "active" : ""}`}>{tab}</button>
               </li>
            ))}
         </ul>
         <div className="tab-content" id="myTabContent">
            <div className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`} id="overview-tab-pane" role="tabpanel" aria-labelledby="overview-tab">
               <Overview content={content} />
            </div>
            <div className={`tab-pane fade ${activeTab === 1 ? 'show active' : ''}`} id="overview-tab-pane" role="tabpanel" aria-labelledby="quiz-tab">
               
            </div>
            <div className={`tab-pane fade ${activeTab === 2 ? 'show active' : ''}`} id="instructors-tab-pane" role="tabpanel" aria-labelledby="instructors-tab">
               <Instructors />
            </div>
            <div className={`tab-pane fade ${activeTab === 3 ? 'show active' : ''}`} id="reviews-tab-pane" role="tabpanel" aria-labelledby="reviews-tab">
               <Reviews />
            </div>
         </div>
      </div>
   );
};

export default LessonNavTav;
