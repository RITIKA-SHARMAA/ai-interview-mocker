import React from 'react';
import {Lightbulb} from "lucide-react";

function QuestionSection({ mockInterviewQuestions, activeQuestionIndex }) {
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
            <h2 className="mt-6 text-md md:text-lg text-white">{mockInterviewQuestions[activeQuestionIndex]?.question}</h2>

            <div className='p-5 mt-15 border rounded-lg border-y-blue-800 bg-blue-100'>
                <h2 className='flex gap-2 items-center text-blue-800'><Lightbulb/> <strong>Note: </strong></h2>
                <h2 className='mt-4 text-blue-800'> {process.env.NEXT_PUBLIC_QUESTION_INFORMATION}</h2>
            </div>
        </div>
    );
}

export default QuestionSection;
