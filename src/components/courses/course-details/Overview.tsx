type OverviewProps = {
   content: any;
};

const Overview = ({ content }: OverviewProps) => {
   return (
      <div className="courses__overview-wrap">
         {content && content.map((section: any, index: number) => (
            <div key={index}>
               {section.title && <h3 className="title">{section.title}</h3>}
               {section.description && <p>{section.description}</p>}
               {section.content_type === "list" && (
                  <ul className="about__info-list list-wrap">
                     {section.list.map((item: string, idx: number) => (
                        <li key={idx} className="about__info-list-item">
                           <i className="flaticon-angle-right"></i>
                           <p className="content">{item}</p>
                        </li>
                     ))}
                  </ul>
               )}
               {section.last_info && <p className="last-info">{section.last_info}</p>}
            </div>
         ))}
      </div>
   );
};

export default Overview;
