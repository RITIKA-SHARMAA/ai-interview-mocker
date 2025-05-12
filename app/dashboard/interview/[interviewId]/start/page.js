"use client";
import React, { useEffect, useState } from 'react';
import {eq} from "drizzle-orm";
import { MockInterview } from "../../../../../utils/schema";
import {db} from "../../../../../utils/db";
import {useParams} from "next/navigation";
import QuestionSection from "../start/_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection"
function StartInterviewPage() {
    const params = useParams();
    const interviewId = params.interviewId;
    const [interviewData, setInterviewData] = useState(null);
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
    const[activeQuestionIndex, setActiveQuestionIndex] = useState(1);

    useEffect(() => {
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        try {
            const result = await db
                .select()
                .from(MockInterview)
                .where(eq(MockInterview.mockId, interviewId)) //
                .execute();

                const jsonMockResp  = JSON.parse(result[0].jsonMockResp);
                setMockInterviewQuestions(jsonMockResp)
                setInterviewData(result[0] || null);

                console.log("Mock Interview Questions:", jsonMockResp);
            console.log("jsonMockResp typeof:", typeof jsonMockResp);
            console.log("jsonMockResp isArray:", Array.isArray(jsonMockResp));
            // console.log("jsonMockResp value:", jsonMockResp);
            console.log(result);
            setInterviewData(result[0] || null);
        } catch (err) {
            console.error("Error fetching interview details:", err);
        }
    };


    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            {/*Questions*/}
            <QuestionSection
                mockInterviewQuestions = {mockInterviewQuestions}
                activeQuestionIndex = {activeQuestionIndex}
            />

            {/*video and audio rec*/}
            <RecordAnswerSection/>

            {/*<h1 className="text-5xl text-white font-bold mb-5">Start Interview</h1>*/}
            {/*<p className="text-lg mb-5 text-white">Your interview is about to begin!</p>*/}

        </div>
    );
}

export default StartInterviewPage;