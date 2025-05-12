'use client';

import React from 'react';
import { Lightbulb, Volume2 } from "lucide-react";

function QuestionSection({ mockInterviewQuestions, activeQuestionIndex }) {

    const handleSpeak = () => {
        const question = mockInterviewQuestions[activeQuestionIndex]?.question;
        if (!question) return;

        const utterance = new SpeechSynthesisUtterance(question);
        utterance.lang = 'en-US';
        speechSynthesis.cancel(); // Cancel any ongoing speech
        speechSynthesis.speak(utterance);
    };

    return mockInterviewQuestions && (
        <div className='p-5 border rounded-lg'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {mockInterviewQuestions.map((question, index) => (
                    <h2
                        key={index}
                        className={`p-2 bg-gray-800 text-gray-400 rounded-full text-xs md:text-sm font-bold text-center
                        ${activeQuestionIndex === index ? 'bg-primary text-white' : ''}`}
                    >
                        Question {index + 1}
                    </h2>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
                <h2 className="text-md md:text-lg text-white flex-1">
                    {mockInterviewQuestions[activeQuestionIndex]?.question}
                </h2>

            </div>
            <button
                onClick={handleSpeak}
                className="ml-2 p-2 mt-5 text-white hover:text-blue-400 transition duration-200"
                title="Listen to Question"
            >
                <Volume2 size={24}/>
            </button>

            <div className='p-5 mt-6 border rounded-lg border-y-blue-800 bg-blue-100'>
                <h2 className='flex gap-2 items-center text-blue-800'><Lightbulb/> <strong>Note: </strong></h2>
                <h2 className='mt-4 text-blue-800'> {process.env.NEXT_PUBLIC_QUESTION_INFORMATION}</h2>
            </div>
        </div>
    );
}

export default QuestionSection;
