import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Questions() {
  const { state } = useLocation(); // Access the selected subject passed from Home
  const [quizData, setQuizData] = useState(null); // Store fetched quiz data
  const [currentQuestion, setCurrentQuestion] = useState(0); // Track current question
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer
  const [showNext, setShowNext] = useState(false); // Control "Next Question" button
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false); // Track correctness

  const subject = state?.subject; // Get the selected subject

  // Fetch the quiz data when the component mounts
  useEffect(() => {
    fetch("/questions.json") // Fetch the JSON from the public folder
      .then((response) => response.json())
      .then((data) => setQuizData(data))
      .catch((error) => console.error("Error fetching the quiz data:", error));
  }, []);

  // If quiz data is not loaded yet, show loading message
  if (!quizData) {
    return <div>Loading quiz data...</div>;
  }

  // Find the subject in the quizData array
  const subjectData = quizData.subjects.find(
    (subj) => subj.subject === subject
  );

  // If no subject data is found, show an error message
  if (!subjectData) {
    return <div>No questions available for {subject}</div>;
  }

  // Get the questions for the found subject
  const questions = subjectData.questions;

  // Get the current question
  const current = questions[currentQuestion];

  // Handle when an answer is clicked
  const handleAnswerClick = (isCorrect) => {
    setSelectedAnswer(isCorrect); // Mark the selected answer
    setAnsweredCorrectly(isCorrect); // Track if the answer was correct
    setShowNext(true); // Show the "Next Question" button after an answer is selected
  };

  // Handle moving to the next question
  const handleNextQuestion = () => {
    setSelectedAnswer(null); // Clear the selected answer
    setAnsweredCorrectly(false); // Reset correctness tracking
    setShowNext(false); // Hide the "Next Question" button
    setCurrentQuestion((prev) => prev + 1); // Move to the next question
  };

  const isAnswered = selectedAnswer !== null; // Check if an answer has been selected

  return (
    <div className="h-screen  flex flex-col items-center justify-center">
      <Link
        to={"/"}
        className="text-white text-xl self-start pl-12 p-3 font-bold"
      >
        Home
      </Link>
      <h1 className="text-white text-xl pl-24 self-start">{subject} Quiz</h1>
      <div className=" flex flex-row p-6">
        <div className="w-96">
          <h2 className="text-3xl mb-4 text-white">{current.question}</h2>
        </div>
        {/* Display the current question */}

        {/* Display answer options */}
        <div className="flex flex-col gap-4">
          {current.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer.isCorrect)}
              className={`p-4 text-white text-xl font-medium text-left rounded-md w-96  hover:bg-blue-800/50 ${
                isAnswered
                  ? answer.isCorrect
                    ? "bg-green-600" // Turn the correct answer green
                    : selectedAnswer === answer.isCorrect
                    ? "bg-red-500" // If the user picked the wrong answer, turn it red
                    : "bg-gray-700" // Make all other answers gray once answered
                  : "bg-blue-600/70" // Default color before answering
              }`}
              disabled={isAnswered} // Disable buttons after answering
            >
              {answer.text}
            </button>
          ))}
          {/* Show "Next Question" button only after answering */}
          {showNext && currentQuestion < questions.length - 1 && (
            <button
              className="mt-4 p-2 bg-blue-700 w-96 text-white rounded"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          )}

          {/* If the user is on the last question, show "Quiz Complete" */}
          {showNext && currentQuestion === questions.length - 1 && (
            <div className="mt-4 p-2 text-green-600">
              Quiz Complete! Well done!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Questions;

{
  /*   <section className="h-screen text-white flex flex-col justify-center items-center gap-6">
        <h3 className="text-white pl-80 text-2xl font-semibold self-start">
          Subject Name
        </h3>
        <div className="flex flex-row gap-60">
          <div>
            <p className="text-zinc-400">Question --- out of ---</p>
            <h1 className="text-4xl">Question here</h1>
          </div>
          <div className="flex flex-col">
            <button>Anwser A</button>
            <button>Anwser B</button>
            <button>Anwser C</button>
          </div>
        </div>
      </section> */
}
/*    </>
  );
}

export default Questions;
 */
