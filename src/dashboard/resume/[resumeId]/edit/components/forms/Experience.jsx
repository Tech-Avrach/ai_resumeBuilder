import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import RichTextEditor from "@/dashboard/components/RichTextEditor";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { AIChatSession } from "../../../../../../../service/AIModel";
import { toast } from "sonner";

const prompt = `Please generate a detailed 3-4 line job experience paragraph for a professional based on the provided job title and position. Include key responsibilities, accomplishments, skills utilized,mention some fake experience as well as fake working tasks thats look realand any notable projects or achievements. Ensure the description is specific.The output should be in JSON array of objects format with one fields: "workSummery", Ensure the JSON format is strictly followed and there are no additional characters outside the JSON structure.Job Title: {jobTitle}, Position Title: {positionTitle}, give response in array of object`;

function Experience() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    const formField = {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummery: "",
    };

    const [experienceList, setExperienceList] = useState([formField]);
    const [aiLoading, setAiLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (index, event) => {
        const newEnteries = experienceList.slice();
        const { name, value } = event.target;
        newEnteries[index][name] = value;
        setExperienceList(newEnteries);
    };

    const AddNewExperience = () => {
        setExperienceList([...experienceList, formField]);
    };

    const RemoveExperience = () => {
        setExperienceList((experienceList) => experienceList.slice(0, -1));
    };

    const handleRichTextEditor = (value, name, index) => {
        const newEnteries = experienceList.slice();
        newEnteries[index][name] = value;
        setExperienceList(newEnteries);
    };

    const typeText = (updateText, prevText, newText, index, newEnteries) => {
        if (newText.length > 0) {
            const nextText = newText[0];
            const remainingText = newText.slice(1);
            const updatedText = prevText + nextText;

            setTimeout(() => {
                updateText(updatedText, index, newEnteries);
                typeText(updateText, updatedText, remainingText, index, newEnteries);
            }, 10);
        }
    };

    const updateText = (updatedText, index, newEnteries) => {
        newEnteries[index].workSummery = updatedText;
        setExperienceList([...newEnteries]);
    };

    const GenerateSummeryFromAI = async (index, positionTitle) => {
        if (!positionTitle) {
            toast("Add Position Title First");
        } else {
            const newEnteries = experienceList.slice();
            setLoading(true);
            setAiLoading(true);
            const FILTER_PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
            const PROMPT = FILTER_PROMPT.replace("{positionTitle}", positionTitle);

            try {
                const result = await AIChatSession.sendMessage(PROMPT);
                const responseText = await result.response.text();
                const parsedResponse = JSON.parse(responseText);

                // Assuming the response is in the format [{ "workSummery": "..." }]
                const response = parsedResponse[0].workSummery || "";
                newEnteries[index].workSummery = ""; // Start with an empty string

                // Use the typing effect function
                typeText(updateText, "", response, index, newEnteries);
            } catch (error) {
                console.error("Error generating summary:", error);
                toast("Error generating summary from AI");
            } finally {
                setLoading(false);
                setAiLoading(false);
            }
        }
    };

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experienceList,
        });
    }, [experienceList]);

    return (
        <div>
            <div className="p-5 shadow-lg border-t-primary border-t-4 mt-10">
                <h2 className="font-bold text-lg">Professional Experience</h2>
                <p>Add your previous Job experience</p>
                <div>
                    {experienceList.map((item, index) => (
                        <div key={index} className="shadow-lg">
                            <div className="grid grid-cols-2 gap-3 border p-3 my-5">
                                <div>
                                    <label className="text-xs">Position Title</label>
                                    <Input
                                        name="title"
                                        value={item.title}
                                        onChange={(event) => handleChange(index, event)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Company Name</label>
                                    <Input
                                        name="companyName"
                                        value={item.companyName}
                                        onChange={(event) => handleChange(index, event)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">City</label>
                                    <Input
                                        name="city"
                                        value={item.city}
                                        onChange={(event) => handleChange(index, event)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">State</label>
                                    <Input
                                        name="state"
                                        value={item.state}
                                        onChange={(event) => handleChange(index, event)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Start Date</label>
                                    <Input
                                        type="date"
                                        name="startDate"
                                        value={item.startDate}
                                        onChange={(event) => handleChange(index, event)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">End Date</label>
                                    <Input
                                        type="date"
                                        name="endDate"
                                        value={item.endDate}
                                        onChange={(event) => handleChange(index, event)}
                                    />
                                </div>
                                <div className="flex justify-between items-end col-span-2">
                                    <label>Add Summary</label>
                                    <Button
                                        size="sm"
                                        type="button"
                                        variant="outline"
                                        onClick={() => GenerateSummeryFromAI(index, item.title)}
                                        className="border-primary text-primary flex gap-1 sm:gap-2 text-xs sm:text-sm"
                                    >
                                        <Brain
                                            className={`h-3 w-3 sm:h-4 sm:w-4 ${aiLoading ? "animate-bounce" : ""
                                                }`}
                                        />
                                        <span className="hidden lg:inline">Generate from AI</span>
                                        <span className="lg:hidden">Generate AI</span>
                                    </Button>
                                </div>
                                <div className="col-span-2">
                                    {/* Work Experience */}
                                    <RichTextEditor
                                        value={item.workSummery} // Pass the value here
                                        onRichTextEditorChange={(event) =>
                                            handleRichTextEditor(
                                                event.target.value,
                                                "workSummery",
                                                index
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="flex flex-col sm:flex-row sm:justify-start gap-2">
                        <Button
                            variant="outline"
                            className="text-primary text-sm" // Adjusted size classes
                            onClick={AddNewExperience}
                        >
                            + Add More Experience
                        </Button>
                        <Button
                            variant="outline"
                            className="text-primary"
                            onClick={RemoveExperience}
                        >
                            - Remove
                        </Button>
                    </div>
                    <div className="flex sm:flex-row flex-col sm:justify-end sm:items-center">
                        <Button type="submit" disabled={loading} className="mt-2 sm:mt-0">
                            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Experience;
