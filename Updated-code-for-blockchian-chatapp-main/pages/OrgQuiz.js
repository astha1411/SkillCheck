import React,{useContext, useState} from 'react'
import { ChatAppContect } from "../Context/ChatAppContext";
import { PendingQuestions, NavBar, AddQuestionModel } from '../Components/index'
import { useRouter } from 'next/router';
import Image from "next/image";
import Style from "../Components/UserProfileAdd/UserProfileAdd.module.css";
import images from "../assets"

const orgQuiz = () => {
  const {account, addExperience2, addQuestions} = useContext(ChatAppContect);
  
    const [selectedItem, setSelectedItem] = useState('');
    const [_addQuestion, _setAddQuestion] = useState(false);
    const router = useRouter();
  
    const handleSelect = (event) => {
      setSelectedItem(event.target.value);
    };
  
    const handleButtonClick = () => {
      router.push(`/viewQuiz?item=${selectedItem}`);
    };
    function handleAddQuestionClick() {
      _setAddQuestion(true);
    }
    
  
  
  return (
    <div>
      <NavBar/>
      <div className={Style.Filter}>
      <div className={Style.Filter_box_right} style={{width:'100%'}}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <select value={selectedItem} onChange={handleSelect}  >
          <option value="">Select a Skill</option>
          <option value="CPP">C++</option>
          <option value="JS">JS</option>
          <option value="Python">Python</option>
          <option value="Kotlin">Kotlin</option>
          <option value="Java">Java</option>
        </select>
        <button onClick={handleButtonClick}>View Quiz</button>
      </div>
      <div className={Style.Filter_box_right}  style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <button onClick={handleAddQuestionClick} style={{ cursor: 'pointer' }}>
            <Image src={images.user} alt="clear" width={20} height={20} />
            ADD QUESTION
          </button>
          </div>
          </div>
          </div>
      <PendingQuestions account={account}/>
      {_addQuestion && (
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
      )}
    </div>
  )
}

export default orgQuiz