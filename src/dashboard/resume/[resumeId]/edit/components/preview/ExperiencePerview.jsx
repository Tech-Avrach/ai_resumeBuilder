import React from "react";
import ReactHtmlParser from 'react-html-parser';
import "./ExperiencePreview.css";

function ExperiencePerview({ resumeInfo }) {
    return (
        <div className="my-6">
            <h2
                className="text-center font-bold text-sm mb-2"
                style={{ color: resumeInfo?.themeColor }}
            >
                Professional Experience
            </h2>
            <hr style={{ borderColor: resumeInfo?.themeColor }} />

            {resumeInfo?.experience?.map((exp, index) => (
                <div key={index} className="my-5 rsw-ce"> {/* Ensure rsw-ce class is applied */}
                    <h2
                        className="text-sm font-bold"
                        style={{ color: resumeInfo?.themeColor }}
                    >
                        {exp?.title}
                    </h2>
                    <h2 className="text-xs flex justify-between mb-2">
                        {exp?.companyName} {exp?.city === "" ? null : '|'} {exp?.city} {exp?.state === "" ? null : ','} {exp?.state}
                        <span>
                            {exp?.startDate} {exp?.startDate === "" ? null : '-'} {" "}
                            {exp?.currentlyWorking ? "Present" : exp?.endDate}
                        </span>
                    </h2>
                    {/* <p className="text-xs my-2">{exp?.workSummery}</p> */}
                    {/* Render HTML content with ReactHtmlParser */}
                    <div className="text-xs">{ReactHtmlParser(exp?.workSummery)}</div>
                </div>
            ))}
        </div>
    );
}

export default ExperiencePerview;
