import React, { useState } from 'react'

function Education() {

    const [educationalList, setEductionalList] = useState([
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: '',
        }
    ])

  return (
    <div>
        <div className="p-5 shadow-lg border-t-primary border-t-4 mt-10">
                <h2 className="font-bold text-lg">Education Details</h2>
                <p>Add your educational details</p>
                </div>
    </div>
  )
}

export default Education