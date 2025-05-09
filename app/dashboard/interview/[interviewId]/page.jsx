"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { MockInterview } from "../../../../utils/schema";
import { db } from "../../../../utils/db";
import { eq } from 'drizzle-orm'; // ✅ This is the correct import
import Webcam from "react-webcam";
import {Lightbulb, WebcamIcon} from "lucide-react";
import {Button} from "../../../../components/button";
import Link from 'next/link';
export default function Interview() {
    const params = useParams();
    const interviewId = params.interviewId;
    const [interviewData, setInterviewData] = useState(null);
    const [webcamEnabled, setWebcamEnabled] = useState(false);

    //used to get interview details by MockId/InterviewId
    const GetInterviewDetails = async () => {
        try {
            const result = await db
                .select()
                .from(MockInterview)
                .where(eq(MockInterview.mockId, interviewId)) // ✅ Use eq() like this
                .execute();

            console.log(result);
            setInterviewData(result[0] || null);
        } catch (err) {
            console.error("Error fetching interview details:", err);
        }
    };

    useEffect(() => {
        if (interviewId) {
            GetInterviewDetails();
        }
    }, [interviewId]);

    return (
        <div className="p-4 text-white">
            <div className='my-4 flex justify-center flex-col items-center'>
                <h1 className="text-5xl font-bold mb-5">Let's Get Started</h1>

                <div className='flex flex-row justify-between gap-9 w-full max-w-6xl my-5'>

                    {/* LEFT: Interview Details */}
                    <div className='flex flex-col flex-1'>
                        {interviewData ? (
                            <div className='flex flex-col gap-5'>
                                <div className="space-y-2 rounded-lg border p-3 gap-4">
                                    <h2 className='text-xl'><strong>Job Position:</strong> {interviewData.jobPosition}
                                    </h2>
                                    <h2 className='text-xl'><strong>Job Description:</strong> {interviewData.jobDesc}
                                    </h2>
                                    <h2 className='text-xl'><strong>Job Experience:</strong> {interviewData.jobExp}</h2>
                                </div>
                                <div className='p-5 border rounded-lg border-y-amber-300 bg-yellow-100'>
                                    <h2 className='flex gap-2 items-center text-yellow-400'><Lightbulb/> <strong>Information</strong></h2>
                                    <h2 className='mt-4 text-yellow-400'> {process.env.NEXT_PUBLIC_INFORMATION}</h2>
                                </div>
                            </div>

                        ) : (
                            <p>Loading interview data...</p>
                        )}
                    </div>

                    {/* RIGHT: Webcam */}
                    <div className='flex flex-col items-end flex-1'>
                        {webcamEnabled ? (
                            <Webcam
                                onUserMedia={() => setWebcamEnabled(true)}
                                onUserMediaError={() => setWebcamEnabled(false)}
                                mirrored={true}
                                style={{
                                    height: 300,
                                    width: 300,
                                    borderRadius: '8px'
                                }}
                            />
                        ) : (
                            <>
                                <WebcamIcon className="h-96 w-150 p-15 bg-gray-300 rounded-lg border"/>
                                <div className='mt-3'>
                                    <Button className='bg-gray-700 w-full text-white hover:bg-gray-600 mt-5'
                                            onClick={() => setWebcamEnabled(true)}>
                                        Enable Web Cam and Microphone
                                    </Button>
                                </div>
                            </>
                        )}

                        <div>
                            <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
                                <Button className='bg-primary font-bold text-white hover:bg-gray-600 mt-5'
                                        onClick={() => setWebcamEnabled(true)}>
                                    Start Interview
                                </Button>
                            </Link>

                        </div>

                    </div>
                </div>

            </div>
            <p className="text-gray-400 mb-4">Interview ID: {interviewId}</p>
        </div>

    );
}
