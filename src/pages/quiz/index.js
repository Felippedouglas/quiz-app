import { useEffect, useState } from "react";
import { Perguntas } from "../../componentes/perguntas";
import './style.css'

export default function Quiz({setQuiz}) {

    const [ numeroPergunta, setNumeroPergunta ] = useState(0);
    const [ valendo, setValendo ] = useState(25);
    const [ PerguntasAleatorias, setPerguntasAleatorias ] = useState([]);
    
    useEffect(()=>{
        setPerguntasAleatorias(shuffleArray(Perguntas))
    }, [])

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    
        return arr;
    }

    function VerificarResposta(respostaCorreta) {
        let alternativaEscolhida = document.querySelector('input[name="alternativa"]:checked').value;

        var radio = document.querySelector(`#alternativa-${alternativaEscolhida}`);
        radio.checked = false;
        
        var labelSelecionada = document.getElementById(`label-alternativa-${alternativaEscolhida}`);

        if (alternativaEscolhida == respostaCorreta) {

            labelSelecionada.style.background = '#32CD32';
            
            setTimeout(()=>{
                labelSelecionada.style.background = '#404040';
                setNumeroPergunta(numeroPergunta + 1);
    
                if (valendo == 800) {
                    setValendo(1000);
                } else if (valendo < 800) {
                    setValendo(valendo * 2);
                } else if (valendo == 1000) {
                    setQuiz('parabens')
                }
            }, 2000)
        } else {

            labelSelecionada.style.background = '#FF4500';

            setTimeout(()=>{
                setQuiz('recomecar');
            }, 2000)
        }
    }

    return (
        <>
            {PerguntasAleatorias.slice(numeroPergunta, numeroPergunta + 1).map((pergunta, key)=> {
                
                {console.log(pergunta.resposta_id)}
                return (
                    <div className="container-quiz" key={key}>
                        <header>
                            <span>valendo: {valendo}</span>
                            <span>Acertos: {numeroPergunta}</span>
                        </header>
                        <p className="p-numero-pergunta">Pergunta {numeroPergunta + 1}</p>
                        <h1 className="titulo-pergunta">{pergunta.titulo}</h1>
                        <div className='div-alternativas'>
                            {shuffleArray(pergunta.alternativas).map((alternativa, key)=> {
                                return (
                                    <div key={key} className="alternativa">
                                        <input type='radio' name='alternativa' className="input-alternativa" id={`alternativa-${alternativa.id}`} value={alternativa.id}/>
                                        <label htmlFor={`alternativa-${alternativa.id}`} id={`label-alternativa-${alternativa.id}`}>{key + 1}) {alternativa.alternativa}</label>
                                    </div>
                                )
                            })}
                        </div>
                        {numeroPergunta + 1 <= PerguntasAleatorias.length &&
                            <button className="bt-responder" onClick={()=>VerificarResposta(pergunta.resposta_id)}>Responder</button>
                        }
                        <footer>
                            <span>Desenvolvido por Felippe Douglas</span>
                        </footer>
                    </div>
                )
            })}
        </>
    )
}