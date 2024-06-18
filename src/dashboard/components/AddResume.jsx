import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GlobalApi from './../../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';

function AddResume() {

    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState();
    const { user } = useUser();
    const [loading, setLoading] = useState(false);


    const onCreate = () => {
        setLoading(true);
        const uuid = uuidv4();
        
        const data={
            data: {
                title: resumeTitle,
                resumeId: uuid,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName
            }
        }

        GlobalApi.CreateNewResume(data).then(resp => {
            console.log(resp);
            if(resp) {
                setLoading(false);
                setOpenDialog(false);
            }
        }, (error) => {
            setLoading(false);
        })
    }

  return (
    <div>
        <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed'
        onClick={() => setOpenDialog(true)}>
            <PlusSquare />
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Resume</DialogTitle>
                    <DialogDescription>
                        <span>Add Title for your new resume</span>
                        <Input className='my-2' placeholder="Ex: Web Developer" onChange={(e) => setResumeTitle(e.target.value)}/>
                    </DialogDescription>
                    <div className='flex gap-5 justify-end'>
                        <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button 
                        disabled={!resumeTitle || loading}
                        onClick={() => onCreate()}>
                            {loading ? 
                                <Loader2 className='w-4 h-4 animate-spin'/> : "Create"
                        }
                            </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddResume