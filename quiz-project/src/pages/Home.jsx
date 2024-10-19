import SubjectBtn from "../components/subjectBtn";
import { useNavigate } from "react-router-dom";
const topics = ["JavaScript", "HTML", "CSS", "Accessibility"];
function Home() {
  const navigate = useNavigate();
  const handleSubjClick = (subject) => {
    navigate("/questions", { state: { subject } });
  };
  return (
    <>
      <div className="h-screen flex flex-row justify-around items-center px-40">
        <div className="flex flex-col">
          <h1 className="text-5xl text-white font-semibold pb-4">
            Welcome to the Quiz!
          </h1>
          <h4 className="text-2xl text-white">
            Pick a subject to get started!
          </h4>
        </div>
        <div className="flex flex-col h-52 w-72 justify-center items-stretch gap-5">
          {topics.map((subject) => (
            <SubjectBtn
              key={subject}
              topic={subject}
              onClick={() => handleSubjClick(subject)}
            />
          ))}
          {/*    <SubjectBtn value={"JS"} />
          <SubjectBtn value={"HTML"} />
          <SubjectBtn value={"CSS"} />
          <SubjectBtn value={"Accessibility"} /> */}
        </div>
      </div>
    </>
  );
}

export default Home;
