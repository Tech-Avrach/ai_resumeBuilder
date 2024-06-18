import React from 'react'

function EducationalPreview({resumeInfo}) {
  return (
    <div className="my-6">
        <h2
                className="text-center font-bold text-sm mb-2"
                style={{ color: resumeInfo?.themeColor }}
            >
                Educational Experience
            </h2>
            <hr style={{ borderColor: resumeInfo?.themeColor }} />

            {resumeInfo?.education?.map((edu, index) => (
                <div key={index} className="my-5">
                    <h2 className="text-sm font-bold" style={{color: resumeInfo?.themeColor}}>{edu?.universityName}</h2>
                    <h2 className="text-xs flex justify-between">
                        {edu?.degree} | {edu?.major}
                        <span>
                            {edu?.startDate} -{" "}
                            {edu?.currentlyStudying
                                ? "Present"
                                : edu?.endDate}
                        </span>
                    </h2>
                    <p className="text-xs my-2">{edu?.descriptionl}</p>
                </div>
            ))}
    </div>
  )
}
 
export default EducationalPreview