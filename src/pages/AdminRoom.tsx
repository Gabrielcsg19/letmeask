import { useHistory, useParams, Link } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import emptyQuestionsImg from '../assets/images/empty-questions.svg'

import { Button } from '../components/Button'
import { Question } from '../components/Question'

import { database } from '../services/firebase'
import { useRoom } from '../hooks/useRoom'

import '../styles/room.scss'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { UserInfo } from '../components/UserInfo'

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [isAnswered, setIsAnswered] = useState(true);
  const [isHighLighted, setHighLighted] = useState(true);

  const { user } = useAuth();
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Você tem certeza de que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered
    });
    setIsAnswered(!isAnswered)
  }

  async function handleHighLightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted
    });
    setHighLighted(!isHighLighted)
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
        </div>
      </header>

      <main>
        <div className="room-title">
          <div>
            <h1>Sala { title }</h1>
            {questions.length > 0 && (
              <span>{questions.length} {questions.length === 1 ? 'pergunta' : 'perguntas'}</span>
            )}
          </div>
          <Link className="admin-page-link" to={`/rooms/${roomId}`}>Visualizar como participante</Link>
        </div>

        { user && (
            <UserInfo />
          )
        }
        
        <div className="question-list">
          {questions.length > 0 ? (
            questions.map(question => (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighLighted={question.isHighLighted}
              >
                <button
                type="button"  
                onClick={() => handleCheckQuestionAsAnswered(question.id)}
                >
                  <img src={checkImg} alt="Marcar pergunta como respondida" />
                </button>
                <button
                  type="button"  
                  onClick={() => handleHighLightQuestion(question.id)}
                >
                  <img src={answerImg} alt="Dar destaque à pergunta" />
                </button>
                <button
                  type="button"  
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            ))
          ) : (
            <div className="empty-questions">
            <img src={emptyQuestionsImg} alt="Sem questões no momento" />
            <span>Nenhum pergunta no momento...</span>
          </div>
          )}
        </div>
      </main>
    </div>
  )
}