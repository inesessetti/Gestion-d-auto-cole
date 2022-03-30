import React, { useState } from 'react';
import questions from './Questions/Questions'
import './Test.css'
import { Button } from '@material-ui/core';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useHistory } from 'react-router';
import "./Timer.css";


export default function App() {
    const [key, setKey] = useState(0);
    const [duration, setDuration] = useState(20);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [isPlaying, setisPlaying] = useState(true);
    const history = useHistory();

    //fonction qui traîte le cas où il a cliquer sur une option, prenant en paramètre si l'option est correcte ou non
    const handleAnswerOptionClick = (isCorrect) => {
        //si l'option est correcte, le score augmente de 1
        if (isCorrect) {
            setScore(score + 1);
        }
        //on passe a la question suivante
        setCurrentQuestion(currentQuestion + 1)
        if (currentQuestion < questions.length - 1) {
            setKey(prevKey => prevKey + 1);

        }
        else {
            setShowScore(true);
            setisPlaying(false);
        }
    };

    //fonction qui va afficher le temps qui écoule, elle se charge aussi d'agir dans le cas où le temps restant est nul
    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            setCurrentQuestion(currentQuestion + 1)
            if (currentQuestion < questions.length - 1) {
                setKey(prevKey => prevKey + 1);

            }
            else {
                setShowScore(true);
                setisPlaying(false);
            }
        }
        return (
            <div className="timer">
                <div className="text">Il vous reste</div>
                <div className="value">{remainingTime}</div>
                <div className="text">seconds</div>
            </div>
        );
    };
    const Retour = () => {
        history.push('/user/Tests')
        return('')
    }
    return (
        <div>
            <div className='QuestionCard'>
                {showScore ? (
                    <div>
                        <div className='QuestionScore'>
                            Vous avez obtenu {score} sur {questions.length}
                        </div>
                        <Button style={{ marginTop: 50 }} variant='outlined' onClick={Retour}>Retour</Button>
                    </div>
                ) : (
                    <>
                        <div className='questionSection'>
                            <div className='questionNum'>
                                <span>Question {currentQuestion + 1}</span>/{questions.length}
                            </div>
                            <img className="imageQuestion" src={questions[currentQuestion].image} />
                            <h2 style={{
                                color: '#f2f2f2',
                                fontSize: '1.1rem', fontFamily: "Century Gothic", fontWeight: "normal", marginBottom: "12px"
                            }}>{questions[currentQuestion].question}</h2>
                            <br />
                        </div>
                        <div className='answer'>
                            {questions[currentQuestion].answerOptions.map((answerOption) => (
                                <Button variant="outlined" style={{ color: "#5bc0be", fontSize: '1rem', fontFamily: "Century Gothic", fontWeight: "normal" }} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.option}</Button>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div style={{ marginTop: -350, marginLeft: 1250, marginRight: 200 }}>
                <div className="timer-wrapper">
                    {(!showScore) ? <CountdownCircleTimer
                        key={key}
                        isPlaying={isPlaying}
                        duration={duration}
                        colors={[['#0b132b', 0.03],
                        ['#1c2541', 0.33],
                        ['#3a506b', 0.33], ['#5bc0be']]}
                        onComplete={() => {
                            setDuration(20);
                            setKey((prevKey) => prevKey + 1);
                        }}
                    >
                        {renderTime}
                    </CountdownCircleTimer> : ''}
                </div>
            </div>
        </div>
    );
}