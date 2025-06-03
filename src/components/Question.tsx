import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { questions } from "../data/data";
import type { QuestionsLike } from "../data/falsafa";
import { capitalizeFirstLetter } from "../utils/сF";
import './Question.css';

const shuffleArray = <T,>(array: T[]): T[] =>
  [...array].sort(() => Math.random() - 0.5);

interface UserAnswer {
  selected: string;
  isCorrect: boolean;
}

interface UserAnswers {
  [questionId: number]: UserAnswer;
}

interface AppState {
  testData?: QuestionsLike;
  userAnswers: UserAnswers;
  settings: {
    questionCount: number;
  };
}

const Question: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("1");
  const { name } = useParams();
  const [state, setState] = useState<AppState>({
    userAnswers: {},
    settings: {
      questionCount: 1
    }
  });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);


  const storageKey = name ? `testApp_${name}` : '';

  useEffect(() => {
    if (!storageKey) return;

    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      try {
        const parsed: AppState = JSON.parse(savedState);
        setState(parsed);
      
        setInputValue(parsed.settings.questionCount.toString());
      } catch {
        localStorage.removeItem(storageKey);
      }
    }
  }, [storageKey]);



  const saveState = (newState: Partial<AppState>) => {
    const updatedState = { ...state, ...newState };
    setState(updatedState);
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(updatedState));
    }
  };

  const handleGenerate = () => {
    if (!name) return;

    const currentTest = questions.find(q => q.title === name);
    if (!currentTest) return;

    const questionCount = Math.min(
      state.settings.questionCount,
      currentTest.questions.length
    );

    const shuffledQuestions = shuffleArray(currentTest.questions)
      .slice(0, questionCount)
      .map(q => ({
        ...q,
        options: shuffleArray(q.options),
      }));

    const newTest: QuestionsLike = {
      ...currentTest,
      questions: shuffledQuestions,
    };

    saveState({
      testData: newTest,
      userAnswers: {},
      settings: {
        questionCount: questionCount
      }
    });
    setCurrentIndex(0);
    
    setShowAnswers(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    const num = parseInt(val);
    if (!isNaN(num) && num > 0) {
      saveState({
        settings: {
          ...state.settings,
          questionCount: num
        }
      });
    }
  };

  const onClearStorage = () => {
  const ws = confirm("Xohlaysiz o'chirishni ?")
  if(ws) {
       if (storageKey) {
      localStorage.removeItem(storageKey);
      setState({
        userAnswers: {},
        settings: {
          questionCount: 1
        }
      });
      setCurrentIndex(0);
 
      setShowAnswers(false);
      setInputValue("1");
    }
  }
  };

  const navigateQuestion = (direction: 'prev' | 'next') => {
    if (!state.testData) return;
    
    const newIndex = direction === 'prev' 
      ? Math.max(currentIndex - 1, 0)
      : Math.min(currentIndex + 1, state.testData.questions.length - 1);
    
    setCurrentIndex(newIndex);
  };

  const handleOptionSelect = (selectedOption: string) => {
    if (!state.testData || !currentQuestion) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const newAnswers = {
      ...state.userAnswers,
      [currentQuestion.id]: {
        selected: selectedOption,
        isCorrect
      }
    };

    saveState({ userAnswers: newAnswers });
 
  };

  const toggleShowAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  const currentQuestion = state.testData?.questions[currentIndex];
  const currentAnswer = currentQuestion ? state.userAnswers[currentQuestion.id] : undefined;

  const getOptionClassName = (option: string): string => {
    let className = 'option';

    if (!showAnswers) {
      if (currentAnswer?.selected === option) {
        className += ' option-selected';
      }
      return className;
    }

    const isCorrect = option === currentQuestion?.correctAnswer;
    const isSelected = currentAnswer?.selected === option;

    if (isCorrect) {
      className += ' option-correct';
    } else if (isSelected && !isCorrect) {
      className += ' option-incorrect';
    }

    return className;
  };

  return (
    <div className="test-container">
      <h3 className="test-title">
        {state.testData?.title && capitalizeFirstLetter(state.testData.title)}
      </h3>

      <div className="score-container">
        <div className="score-text">
          To'gri javoblar: {Object.keys(state.userAnswers).length} / {inputValue}  
        </div>
        
        <button 
          className={`show-answers-btn ${showAnswers ? 'active' : ''}`}
          onClick={toggleShowAnswers}
        >
          {showAnswers ? 'Yopish savollarni' : 'Ochish savollarni'}
        </button>
      </div>

      <div className="controls-container">
        <div className="input-control">
         
          <input
            type="number"
            className="question-input"
            value={inputValue}
            onChange={handleInputChange}
            min="1"
            max={questions.find(q => q.title === name)?.questions.length || 100}
          />
        </div>
        
        <button 
          className="generate-btn"
          onClick={handleGenerate}
        >
          Yaratish test
        </button>
      </div>

      {currentQuestion && (
        <div className="question-card">
          <h4 className="question-counter">
          {currentIndex + 1} savol {state.testData?.questions.length}  dan  
          </h4>
          <br />
          <p className="question-text">
            {currentQuestion.question}
          </p>
          
          <ul className="options-list">
            {currentQuestion.options.map((option, index) => (
              <li 
                key={index}
                className={getOptionClassName(option)}
                onClick={() => handleOptionSelect(option)}
              >
                {String.fromCharCode(65 + index)}&nbsp; {option}
              </li>
            ))}
          </ul>
        </div>
      )}

      {state.testData && (
        <div className="navigation-buttons">
          <button 
            className={`nav-btn prev-btn ${currentIndex === 0 ? 'disabled' : ''}`}
            onClick={() => navigateQuestion('prev')}
            disabled={currentIndex === 0}
          >
            {"<"}
          </button>
          
          <button 
            className={`nav-btn next-btn ${currentIndex === (state.testData.questions.length - 1) ? 'disabled' : ''}`}
            onClick={() => navigateQuestion('next')}
            disabled={currentIndex === (state.testData.questions.length - 1)}
          >
             {">"}
          </button>
        </div>
      )}
<br />

      <div className="clear-container">
        <button 
          className="clear-btn"
          onClick={onClearStorage}
        >
       Tozalash
        </button>
      </div>
    </div>
  );
};

export default Question;