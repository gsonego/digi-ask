import { useHistory, useParams } from 'react-router-dom';
import { database } from '../services/firebase';

import { useRoom } from '../hooks/useRoom';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { Logo } from '../components/Logo';

import deleteImg from '../assets/images/delete.svg';

import checkImg from '../assets/images/check.svg';
import checkImgOn from '../assets/images/check_on.svg';

import answerImg from '../assets/images/answer.svg';
import answerImgOn from '../assets/images/answer_on.svg';

import '../styles/room.scss';

type RoomParams = {
  id: string
};

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Are you sure you want to delete this question ?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleQuestionAsAsAnswered(questionId: string, currentState: boolean) {
    const ref = database.ref(`rooms/${roomId}/questions/${questionId}`);
    await ref.update({
      isHighlighted: false,
      isAnswered: !currentState
    });
  }

  async function handleHighlightQuestion(questionId: string, isAnswered: boolean, isHighlighted: boolean) {
    if (isAnswered) return;

    const ref = database.ref(`rooms/${roomId}/questions/${questionId}`);
    await ref.update({
      isHighlighted: !isHighlighted
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <Logo></Logo>
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Close Room</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Room: {title}</h1>
          {questions.length > 0 && <span>{questions.length} {questions.length === 1 ? 'question' : 'questions'}</span>}
        </div>

        <div className="question-list">
          {
            questions.map(question => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  <button
                    type="button"
                    onClick={() => handleQuestionAsAsAnswered(question.id, question.isAnswered)}
                  >
                    <img src={ question.isAnswered ? checkImgOn : checkImg } alt="Mark as answered" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id, question.isAnswered, question.isHighlighted)}
                  >
                    <img src={ question.isHighlighted ? answerImgOn : answerImg } alt="Highlight question" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Delete question" />
                  </button>
                </Question>
              )
            })
          }
        </div>
      </main>
    </div>
  );
}