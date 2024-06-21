import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../../../service/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AIChatSession } from "../../../../../../../service/AIModel";

const prompt = `Job Title: {jobTitle} , Depends on job title give me summary for my resume. The output should be in JSON array of objects format with two fields: "experienceLevel" and "summary". Provide three summaries: one for "Fresher", one for "Mid-Level", and one for "Experienced". Each summary should be within 4-5 lines. Ensure the JSON format is strictly followed and there are no additional characters outside the JSON structure.`;
function Summery({ enableNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState();
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    // summery && setResumeInfo({...resumeInfo, summery})
    setSummery(resumeInfo?.summery)
  },[])

  

  const handleInputChange = (e) => {
    setSummery(e.target.value);
    setResumeInfo({ ...resumeInfo, summery: e.target.value });
  };

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    setAiLoading(true);

    try {
      const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
      const result = await AIChatSession.sendMessage(PROMPT);

      if (!result || !result.response) {
        throw new Error("Invalid response from AI chat session");
      }

      const responseText = await result.response.text();

      // Try to parse the JSON response
      const parsedResponse = JSON.parse(responseText);
      setAiGeneratedSummeryList(parsedResponse);
    } catch (error) {
      console.error("Error generating summary from AI:", error);
    } finally {
      setLoading(false);
      setAiLoading(false);
    }
  };

  const copyAiSummary = (index,aiSummary) => {
    setActiveIndex(index);
    setSummery(aiSummary);
    setResumeInfo({ ...resumeInfo, summery: aiSummary });
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: {
        summery,
      },
    };

    try {
      const resp = await GlobalApi.updateResumeDetail(data, params?.resumeId);
      console.log(resp);
      enableNext(true);
      toast("Details Updated");
    } catch (error) {
      console.error("Error updating resume details:", error);
      toast("Something Went Wrong!!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summery</h2>
        <p>Add Summery for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summery</label>
            <Button
              size="sm"
              type="button"
              variant="outline"
              onClick={() => GenerateSummeryFromAI()}
              className="border-primary text-primary flex gap-2"
            >
              {" "}
              <Brain
                className={`h-4 w-4 ${aiLoading ? "animate-bounce" : ""}`}
              />{" "}
              Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            onChange={handleInputChange}
            value={summery}
          />
          <div className="flex justify-end mt-5">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiLoading && (
        <div className="p-5 animate-pulse shadow-lg border-t-primary border-t-4 mt-10">
          <div class="p-5 shadow-lg mt-10 bg-purple-100">
            <div class="animate-pulse flex space-x-4">
              <div class="flex-1 space-y-6 py-1">
                <div class="h-4 w-40 bg-purple-300 rounded"></div>
                <div class="h-2 bg-purple-300 rounded"></div>
                <div class="space-y-3">
                  <div class="grid grid-cols-3 gap-4">
                    <div class="h-2 bg-purple-300 rounded col-span-2"></div>
                    <div class="h-2 bg-purple-300 rounded col-span-1"></div>
                  </div>
                  <div class="h-2 bg-purple-300 rounded col-span-2"></div>
                  <div class="h-2 bg-purple-300 rounded col-span-1"></div>
                  <div class="h-2 bg-purple-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-5 shadow-lg mt-10 bg-purple-100">
            <div class="animate-pulse flex space-x-4">
              <div class="flex-1 space-y-6 py-1">
                <div class="h-4 w-40 bg-purple-300 rounded"></div>
                <div class="h-2 bg-purple-300 rounded"></div>
                <div class="space-y-3">
                  <div class="grid grid-cols-3 gap-4">
                    <div class="h-2 bg-purple-300 rounded col-span-2"></div>
                    <div class="h-2 bg-purple-300 rounded col-span-1"></div>
                  </div>
                  <div class="h-2 bg-purple-300 rounded col-span-2"></div>
                  <div class="h-2 bg-purple-300 rounded col-span-1"></div>
                  <div class="h-2 bg-purple-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-5 shadow-lg mt-10 bg-purple-100">
            <div class="animate-pulse flex space-x-4">
              <div class="flex-1 space-y-6 py-1">
                <div class="h-4 w-40 bg-purple-300 rounded"></div>
                <div class="h-2 bg-purple-300 rounded"></div>
                <div class="space-y-3">
                  <div class="grid grid-cols-3 gap-4">
                    <div class="h-2 bg-purple-300 rounded col-span-2"></div>
                    <div class="h-2 bg-purple-300 rounded col-span-1"></div>
                  </div>
                  <div class="h-2 bg-purple-300 rounded col-span-2"></div>
                  <div class="h-2 bg-purple-300 rounded col-span-1"></div>
                  <div class="h-2 bg-purple-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {aiGeneratedSummeryList && (
        <div className="p-5 shadow-lg border-t-primary border-t-4 mt-10 ">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div
            className={`p-5 shadow-lg mt-10 transition-all cursor-pointer ${activeIndex === index ? 'bg-purple-100 text-black' : 'hover:scale-105 hover:shadow-md'}`}
              key={index}
              onClick={() => copyAiSummary(index, item?.summary)}
            >
              <h2 className="font-bold my-1">Level : {item.experienceLevel}</h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summery;
