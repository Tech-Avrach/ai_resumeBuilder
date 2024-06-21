import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePerview from './preview/ExperiencePerview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'

function ResumePreview() {

    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)

  return (
    <div className='shadow-lg h-full border-t-[20px] p-5 md:p-8 lg:p-14' style={{borderColor:resumeInfo?.themeColor}}>
        {/* Personal detail */}
        <PersonalDetailPreview resumeInfo={resumeInfo}/>
        {/* summery */}
        <SummeryPreview resumeInfo={resumeInfo}/>
        {/* Professional Experience */}
        <ExperiencePerview resumeInfo={resumeInfo}/>
        {/* Education */}
        <EducationalPreview resumeInfo={resumeInfo}/>
        {/* Skills */}
        <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview