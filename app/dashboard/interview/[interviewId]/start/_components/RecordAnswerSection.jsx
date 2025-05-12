'use client';

import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Button } from "../../../../../../components/button";
import { WebcamIcon } from "lucide-react";
import useSpeechToText from "react-hook-speech-to-text";

function RecordAnswerSection() {
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        resetTranscript
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    const [isCamOn, setIsCamOn] = useState(false);
    const [finalTranscript, setFinalTranscript] = useState('');

    // Combine all results into one final transcript when recording stops
    useEffect(() => {
        if (!isRecording && results.length > 0) {
            const combined = results.map(r => r.transcript).join(' ');
            setFinalTranscript(combined);
        }
    }, [isRecording, results]);

    const handleStartStopRecording = () => {
        if (!isCamOn) {
            alert('Please turn on the camera before recording.');
            return;
        }
        isRecording ? stopSpeechToText() : startSpeechToText();
    };

    const handleShowAnswer = () => {
        console.log("User's Answer:", finalTranscript || '[No answer recorded]');
    };

    const handleReAnswer = () => {
        stopSpeechToText();
        setFinalTranscript('');
        resetTranscript?.(); // Optional chaining in case resetTranscript is undefined
    };

    return (
        <div className="flex flex-col mt-20 justify-center items-center rounded-lg p-5 relative space-y-4">
            <div
                className="w-full max-w-md h-72 flex justify-center items-center border rounded-lg overflow-hidden bg-black">
                {isCamOn ? (
                    <Webcam
                        mirrored
                        style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                        }}
                    />
                ) : (
                    <WebcamIcon className="h-96 w-150 p-15 bg-secondary rounded-lg border text-white"/>                )}
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
                <Button
                    onClick={() => setIsCamOn(prev => !prev)}
                    className="transition duration-300 ease-in-out hover:scale-105"
                    variant={isCamOn ? "secondary" : "default"}
                >
                    {isCamOn ? 'Turn Off Camera' : 'Turn On Camera'}
                </Button>

                <Button
                    variant={isRecording ? "destructive" : "default"}
                    onClick={handleStartStopRecording}
                    className="transition duration-300 ease-in-out hover:scale-105"
                >
                    {isRecording ? 'Recording...' : 'Start Recording'}
                </Button>

                <Button
                    onClick={handleShowAnswer}
                    className="transition duration-300 ease-in-out hover:scale-105"
                >
                    Show User Answer
                </Button>


            </div>
            <Button
            variant="outline"
            onClick={handleReAnswer}
            className="text-white border-white hover:bg-white hover:text-black transition duration-300 ease-in-out"
        >
            Re-Answer
        </Button>

        </div>
    );
}

export default RecordAnswerSection;
