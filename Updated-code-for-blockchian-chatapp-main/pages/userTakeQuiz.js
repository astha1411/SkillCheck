import React,{useContext, useState, useEffect} from 'react'
import { ChatAppContect } from "../Context/ChatAppContext";
import { PendingQuestions, UserNavBar, AddQuestionModel } from '../Components/index'
import { useRouter } from 'next/router';
import Image from "next/image";
import Style from "../Components/UserProfileAdd/UserProfileAdd.module.css";
import images from "../assets"

const userTakeQuiz = () => {
  const {account, getQuestionBySkill,skillQuiz , addSkill, getSkills, userSkills} = useContext(ChatAppContect);
  const [responses, setResponses] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [_addQuestion, _setAddQuestion] = useState(false);
    const router = useRouter();
    const { skill } = router.query;
    if(skill == "CPP") skill="C++";
    useEffect(() => {
        if (skill) {
            getQuestionBySkill(skill);
            console.log("hi: "+skill);
        console.log("questionszz: " + skillQuiz);
        console.log("router: "+router.query);
      }
      getSkills(account);
      console.log(userSkills);
    }, [skill]);
    const handleResponse = (i, value) => {
        const newResponses = [...responses];
        newResponses[value] = i;
        console.log("nR: "+i);
        setResponses(newResponses);
      };
      const handleSubmit = () => {
        let count = 0;
        for (let i = 0; i < skillQuiz.length; i++) {
            console.log(i+": "+responses[i]+"  "+skillQuiz[i][5]);
          if (responses[i] === skillQuiz[i][5]) {
            count++;
          }
        }
        const percentage = (count / skillQuiz.length) * 100;
        console.log(`Percentage of correct responses: ${percentage}%`);
        if (percentage > 60) {
            const newUserSkills = [...userSkills, skill];;
            addSkill(newUserSkills);
            router.push('/quizPass');
          }
          else router.push('/quizFail');
      }
  
  return (
    <div>
      <UserNavBar/>
      <div>
        
      </div>
      
      {skillQuiz.map((el, i) => (
  <div key={i} style={{ marginLeft: 'auto' }}>
    <div style={{ backgroundColor: '#191d26', borderRadius: '10px', margin: '10px', padding: '0px 10px 0 10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontWeight: 'bold' }}>{el[0]}</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input type="radio" name={`question-${i}`} value={el[1]} onChange={(e) => handleResponse(1, i)} />
          <label style={{ marginLeft: '5px' }}>{el[1]}</label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input type="radio" name={`question-${i}`} value={el[2]} onChange={(e) => handleResponse(2, i)} />
          <label style={{ marginLeft: '5px' }}>{el[2]}</label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input type="radio" name={`question-${i}`} value={el[3]} onChange={(e) => handleResponse(3, i)} />
          <label style={{ marginLeft: '5px' }}>{el[3]}</label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input type="radio" name={`question-${i}`} value={el[4]} onChange={(e) => handleResponse(4, i)} />
          <label style={{ marginLeft: '5px' }}>{el[4]}</label>
        </div>
      </div>
    </div>
  

  </div>
))}
<button onClick={handleSubmit}>Submit</button>

    </div>
  )
}

export default userTakeQuiz
{/* <select value={selectedItem} onChange={handleSelect}>
          <option value="">Select a Skill</option>
          <option value="CPP">C++</option>
          <option value="JS">JS</option>
          <option value="Python">Python</option>
          <option value="Kotlin">Kotlin</option>
          <option value="Java">Java</option>
        </select>
        <button onClick={handleButtonClick}>View Quiz</button> */}
        {/* <div className={Style.Filter_box_right}> */}
      {/* <button onClick={handleAddQuestionClick} style={{ cursor: 'pointer' }}>
            <Image src={images.user} alt="clear" width={20} height={20} />
            ADD QUESTION
          </button>
          </div>
      <PendingQuestions account={account}/> */}
      {/* {_addQuestion && (
        <div className={Style.Filter_model}>
          <AddQuestionModel
            openBox={_setAddQuestion}
            // title="WELCOME TO"
            head="ADD QUESTION"
            // info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sit doloribus quod vel expedita, dicta voluptatibus, nemo, deserunt minima quis recusandae porro officiis modi fugiat libero tempora corporis necessitatibus itaque!"
            smallInfo="Enter Question Details"
            image={images.hero}
            functionName={addQuestions}
          />
        </div>
      )} */}