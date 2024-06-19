import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from "./../../../../../../../service/GlobalApi";
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

function Summery({enableNext}) {
    
    const params = useParams();
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)

    const [summery, setSummery] = useState();
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //   summery && setResumeInfo({...resumeInfo, summery})
    // })

    const handleInputChange = (e) => {
        setSummery(e.target.value)
        setResumeInfo({...resumeInfo,summery: e.target.value})
    }

    const onSave = (e) => {
      e.preventDefault();
      setLoading(true);

        const data = {
            data: {
              summery,
            }
        };

        GlobalApi.updateResumeDetail(data, params?.resumeId).then(
            (resp) => {
                console.log(resp);
                enableNext(true);
                setLoading(false);
                toast("Details Updated");
            },
            (error) => {
                setLoading(false);
                toast("Something Went Wrong !!");
            }
        );
    } 

  return (
    <div>
        <div className='p-5 shadow-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summery</h2>
        <p>Add Summery for your job title</p>

        <form className='mt-7' onSubmit={onSave}>
            <div className='flex justify-between items-end'>
                <label>Add Summery</label>
                <Button size='sm' type="button" variant='outline' className="border-primary text-primary flex gap-2"> <Brain className='h-4 w-4'/> Generate from AI</Button>
            </div>
            <Textarea className='mt-5' required onChange={handleInputChange}/>
              <div className='flex justify-end mt-5'>
              <Button type="submit" disabled={loading}>
                        {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
                    </Button>
              </div>
        </form>
        </div>
    </div>
  )
}

export default Summery