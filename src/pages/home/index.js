import { useState } from "react";
import Quiz from "../quiz";
import './style.css'

export default function Home() {

    const [ quiz, setQuiz ] = useState(false)

    return(
        <>
            {!quiz && quiz != 'recomecar' &&
                <div className="div-tentar-novamente">
                    <p>Bem vindo ao <strong>Quiz!</strong> <p className="p-emoji">😀</p></p>
                    <button className="bt-comecar-quiz" onClick={()=>setQuiz(true)}>Começar</button>
                </div>
            }
            {quiz && quiz != 'recomecar' && quiz != 'parabens' &&
                <Quiz setQuiz={setQuiz}/>
            }
            {quiz == 'recomecar' &&
                <div className="div-tentar-novamente">
                    <p>Você Perdeu!</p>
                    <button className="bt-comecar-quiz" onClick={()=>setQuiz(true)}>Tentar Novamente</button>
                </div>
            }
            {quiz == 'parabens' && 
                <div className="div-tentar-novamente">
                    <p>Parabéns, você venceu!</p>
                    <button className="bt-comecar-quiz" onClick={()=>setQuiz(true)}>Jogar Novamente</button>
                </div>
            }
        </>
    )
}