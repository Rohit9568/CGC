import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LessonFaq from "./LessonFaq";
import LessonNavTav from "./LessonNavTav";
import LessonVideo from "./LessonVideo";

const LessonArea = () => {
  const { uniqueCode } = useParams(); // Destructure `uniqueCode` from URL parameters
  const [lessonContent, setLessonContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("uniqueCode", uniqueCode);
        const response = await fetch(`http://localhost:5000/api/modules/${uniqueCode}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log(data.faq);
        setLessonContent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uniqueCode]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="lesson__area section-pb-120">
      <div className="container-fluid p-0">
        <div className="row gx-0">
          <div className="col-xl-3 col-lg-4">
            <div className="lesson__content">
              <h2 className="title">Course Content</h2>
              {lessonContent.faq && <LessonFaq content={lessonContent.faq} />}
            </div>
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="lesson__video-wrap">
              <div className="lesson__video-wrap-top">
                <div className="lesson__video-wrap-top-left">
                  <Link to="#"><i className="flaticon-arrow-right"></i></Link>
                  <span>{lessonContent.title}</span>
                </div>
                <div className="lesson__video-wrap-top-right">
                  <Link to="#"><i className="fas fa-times"></i></Link>
                </div>
              </div>
              {lessonContent.videoUrl && <LessonVideo videoUrl={lessonContent.videoUrl} />}
              <div className="lesson__next-prev-button">
                <button className="prev-button" title="Create a Simple React App">
                  <i className="flaticon-arrow-right"></i>
                </button>
                <button className="next-button" title="React for the Rest of us">
                  <i className="flaticon-arrow-right"></i>
                </button>
              </div>
            </div>
            {lessonContent.nav && <LessonNavTav content={lessonContent.content} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LessonArea;
