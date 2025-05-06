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

import { sendPromptToGemini } from '../../../utils/GeminiAIModel';
import {chatSession} from "../../../lib/GeminiAIModel";
function AddNewInterview (){
    const [openDialog, setOpenDialog] = React.useState(false);
    const [jobPosition, setJobPosition] = React.useState();
    const [jobDescription, setJobDescription] = React.useState();
    const [yearsOfExperience, setYearsOfExperience] = React.useState();

    //
    // const onSubmit = async (e) => {
    //     e.preventDefault();
    //     setOpenDialog(false);
    //     console.log(jobPosition, jobDescription, yearsOfExperience);
    //
    //     const InputPrompt = `Assume the role of a highly skilled ${jobPosition} with ${yearsOfExperience} years of experience. Based on the following job description: "${jobDescription}", generate a comprehensive list of ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} insightful interview questions tailored to this role. Ensure the questions cover both technical expertise and role-specific problem-solving skills.`;
    //
    //
    //     // try {
    //     //     const response = await fetch("/api/generateInterviewQuestions", {
    //     //         method: "POST",
    //     //         headers: { "Content-Type": "application/json" },
    //     //         body: JSON.stringify({ prompt }),
    //     //     });
    //     //
    //     //     const data = await response.json();
    //     //     console.log("Interview Questions:", data.result);
    //     // } catch (err) {
    //     //     console.error("API call failed:", err);
    //     // }
    //     const result=await chatSession.sendMessage (InputPrompt) ;
    //     const MockJsonResp=(result. response. text()). replace("```json',",''). replace('```','');
    //     console. log (JSON. parse(MockJsonResp)) ;
    // }

    const onSubmit = async (e) => {
        e.preventDefault();
        setOpenDialog(false);
        console.log(jobPosition, jobDescription, yearsOfExperience);

        const InputPrompt = `Assume the role of a highly skilled ${jobPosition} with ${yearsOfExperience} years of experience. Based on the following job description: "${jobDescription}", generate a comprehensive list of ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} insightful interview questions tailored to this role. Ensure the questions cover both technical expertise and role-specific problem-solving skills.`;

        try {
            const response = await fetch("/api/generateInterviewQuestions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: InputPrompt }),
            });

            const data = await response.json();
            console.log("Interview Questions:", data.result);
        } catch (err) {
            console.error("API call failed:", err);
        }
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
                                <Button  type ='submit' className='font-bold'>Start Interview</Button>
                            </div>
                            </form>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        );
}


export default AddNewInterview;