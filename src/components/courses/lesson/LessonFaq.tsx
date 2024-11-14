import React from "react";
import { Link } from "react-router-dom";

interface FaqDetails {
  class_name?: string;
  lock: boolean;
  title: string;
  duration: string;
}

interface LessonFaqProps {
  content: {
    id: number;
    title: string;
    show?: string;
    collapsed?: string;
    count: string;
    faq_details: FaqDetails[];
  }[];
}

const LessonFaq: React.FC<LessonFaqProps> = ({ content }) => {
  return (
    <div className="accordion" id="accordionExample">
      {content.map((item) => (
        <div key={item.id} className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${item.collapsed}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapseOne${item.id}`}
              aria-expanded="true"
              aria-controls={`collapseOne${item.id}`}
            >
              {item.title}
              <span>{item.count}</span>
            </button>
          </h2>
          <div
            id={`collapseOne${item.id}`}
            className={`accordion-collapse collapse ${item.show}`}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <ul className="list-wrap">
                {item.faq_details.map((list, i) => (
                  <React.Fragment key={i}>
                    {list.lock ? (
                      <li className="course-item">
                        <Link to="#" className="course-item-link">
                          <span className="item-name">{list.title}</span>
                          <div className="course-item-meta">
                            <span className="item-meta duration">{list.duration}</span>
                            <span className="item-meta course-item-status">
                              <img
                                src="/assets/img/icons/lock.svg"
                                alt="icon"
                              />
                            </span>
                          </div>
                        </Link>
                      </li>
                    ) : (
                      <li className="course-item open-item">
                        <Link to="#" className="course-item-link popup-video">
                          <span className="item-name">{list.title}</span>
                          <div className="course-item-meta">
                            <span className="item-meta duration">{list.duration}</span>
                          </div>
                        </Link>
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonFaq;
