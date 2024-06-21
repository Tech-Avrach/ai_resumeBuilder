import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

function PersonalDetails({ enableNext }) {
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(params);
        let initialData = {
            firstName : resumeInfo?.firstName,
            lastName : resumeInfo?.lastName,
            jobTitle : resumeInfo?.jobTitle,
            address : resumeInfo?.address,
            phone : resumeInfo?.phone,
            email : resumeInfo?.email,
        }

        setFormData(initialData);
    }, []);

    const handleInputChange = (e) => {
        enableNext(false);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setResumeInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onSave = (e) => {
        e.preventDefault();

        setLoading(true);

        const data = {
            data: formData,
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
    };

    return (
        <div className="p-5 shadow-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">Personal Details</h2>
            <p>Get started with basic information</p>

            <form onSubmit={onSave}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
    <div className="sm:col-span-1">
        <label htmlFor="firstName">First Name</label>
        <Input
            name="firstName"
            id="firstName"
            required
            defaultValue={resumeInfo?.firstName}
            onChange={handleInputChange}
        />
    </div>
    <div className="sm:col-span-1">
        <label htmlFor="lastName">Last Name</label>
        <Input
            name="lastName"
            id="lastName"
            required
            defaultValue={resumeInfo?.lastName}
            onChange={handleInputChange}
        />
    </div>
    <div className="sm:col-span-2">
        <label htmlFor="jobTitle">Job Title</label>
        <Input
            name="jobTitle"
            id="jobTitle"
            required
            defaultValue={resumeInfo?.jobTitle}
            onChange={handleInputChange}
        />
    </div>
    <div className="sm:col-span-2">
        <label htmlFor="address">Address</label>
        <Input
            name="address"
            id="address"
            required
            defaultValue={resumeInfo?.address}
            onChange={handleInputChange}
        />
    </div>
    <div className="sm:col-span-1">
        <label htmlFor="phone">Phone</label>
        <Input
            name="phone"
            id="phone"
            required
            defaultValue={resumeInfo?.phone}
            onChange={handleInputChange}
        />
    </div>
    <div className="sm:col-span-1">
        <label htmlFor="email">Email</label>
        <Input
            name="email"
            id="email"
            required
            defaultValue={resumeInfo?.email}
            onChange={handleInputChange}
        />
    </div>
</div>
                <div className="mt-3 flex justify-end">
                    <Button type="submit" disabled={loading}>
                        {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default PersonalDetails;
