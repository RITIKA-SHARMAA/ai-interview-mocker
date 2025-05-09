"use client"
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/dialog.jsx";
import {Button} from "../../../components/ui/Button";
import {LoaderCircle} from "lucide-react";
import {MockInterview} from "../../../utils/schema";
import {v4 as uuidv4} from "uuid";
import {useUser} from "@clerk/nextjs";
import moment from "moment";
import {db} from "../../../utils/db";
import {useRouter} from "next/navigation";

function AddNewInterview (){
    const [openDialog, setOpenDialog] = React.useState(false);
    const [jobPosition, setJobPosition] = React.useState();
    const [jobDescription, setJobDescription] = React.useState();
    const [yearsOfExperience, setYearsOfExperience] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [jsonResponse, setJsonResponse] = React.useState([]);
    const {user} = useUser();
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(jobPosition, jobDescription, yearsOfExperience);

        const InputPrompt = `Assume the role of a highly skilled ${jobPosition} with ${yearsOfExperience} years of experience. 
Based on the following job description: "${jobDescription}", generate a comprehensive list of ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT}
insightful interview questions tailored to this role. Ensure the questions cover both technical expertise and role-specific problem-solving skills.`;

        try {
            const response = await fetch("/api/generateInterviewQuestions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: InputPrompt,
                    jobPosition,
                    jobDescription,
                    yearsOfExperience,
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                }),
            });

            const data = await response.json();
            // console.log("Interview Questions:", data.result);
            // console.log("Mock Interview ID from API:", data.mockId);

            if (response.ok) {
                const dbResponse = await db.insert(MockInterview).values({
                    mockId: uuidv4(),
                    jsonMockResp: JSON.stringify(
                        data.result
                            .split('\n')
                            .filter((line) => line.trim() !== '')
                            .map((q) => ({ question: q.replace(/^\d+[.)]\s*/, '') })) // remove numbering
                    ),
                    jobPosition,
                    jobDesc: jobDescription,
                    jobExp: yearsOfExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-YYYY'),
                }).returning({ mockId: MockInterview.mockId });

                console.log("Full DB Insert Response:", dbResponse);

                const insertedMockId = dbResponse[0]?.mockId;
                console.log("Inserted ID:", [{ mockId: insertedMockId }]);

                await router.push(`/dashboard/interview/${insertedMockId}`);
                // const formatted = [
                //     {
                //         mockId: insertedMockId,
                //     },
                // ];
                // console.log("Inserted ID:", formatted);
            } else {
                console.error("API returned error status");
            }
        } catch (err) {
            console.error("API call failed:", err);
        }

        setLoading(false); // Finish loading
        setOpenDialog(false); // Now close dialog
        // router.push('/dashboard/interview/'+dbResponse[0]?.mockId)
    };




    return (
            <div>
                <div className='p-8 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                                onClick={() => setOpenDialog(true)}
                >
                    <h2 className='font-bold text-lg  text-center '>+ Add New</h2>
                </div>


                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger className="text-white">Open</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className='font-bold text-2xl text-white'>Tell us more about your job interviewing</DialogTitle>
                            <form onSubmit={onSubmit} >
                            <div >
                                <h2 className='text-gray-400'> Add Details about your job position/role , Job
                                    description and years of experience </h2>

                                <div className='flex flex-col gap-3 mt-5'>
                                    <label className='text-white'>Job Role/Job Position</label>
                                    <input type="text" id="jobPosition" placeholder='e.g. Software Engineer' required
                                           className='border rounded-md p-2  text-white'
                                            onChange={(e) => setJobPosition(e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col gap-3 mt-5'>
                                    <label className='text-white'>Job Discription </label>
                                    <textarea id="jobPosition" placeholder='e.g. React, Angular, Node.js, Express.js' required
                                              className='border rounded-md p-2  text-white'
                                              onChange={(e) => setJobDescription(e.target.value)}
                                    />

                                </div>
                                <div className='flex flex-col gap-3 mt-5'>
                                    <label className='text-white'>Years of Experience </label>
                                    <input id="jobPosition" placeholder='5' type='number'
                                              className='border rounded-md p-2  text-white'
                                    onChange={(e) => setYearsOfExperience(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='p-3 flex gap-5 justify-end'>
                                <Button
                                    className="bg-gray-800 text-white hover:bg-gray-700"
                                    onClick={() => setOpenDialog(false)} type ='button'
                                >
                                    Cancel
                                </Button>
                                <Button type='submit' disabled={loading} className='font-bold'>
                                    {loading ? (
                                        <> <LoaderCircle className='animate-spin' /> Generating from AI </>
                                    ) : (
                                        'Start Interview'
                                    )}
                                </Button>
                            </div>
                            </form>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        );
}


export default AddNewInterview;