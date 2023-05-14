import React,{useContext, useEffect} from 'react'
import { ChatAppContect } from "../Context/ChatAppContext";
import {  NavBar } from '../Components/index';
import { useRouter } from 'next/router';
import Style from "../styles/viewQuiz.module.css";
 
const viewQuiz = () => {
  const { getQuestionBySkill,skillQuiz  } = useContext(ChatAppContect);
  const router = useRouter();
  const { item } = router.query;
  if(item == "CPP") item="C++";
  
  useEffect(() => {
    if (item) {
      getQuestionBySkill(item);
      console.log("questionszz: " + skillQuiz);
      console.log("router: "+router.query);
    }
  }, [item]);
  

  return (
    <div>
    <NavBar/>
      <div className={Style.Filter}>
      {console.log("item: "+item)}
      <h1>{item} Quiz Questions</h1>
        <div className={Style.Chat_box}>
      <div className={Style.Chat_box_box}>
          <div className={Style.Chat_box_left}>
          {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <span>Organisation</span>
  <span>Start</span>
  <span>End</span>
  <span>Status</span>
</div> */}

{skillQuiz.map((el, i) => (
  <div key={i}>
    <div>
      <div style={{ backgroundColor: '#191d26', borderRadius: '10px', margin: '10px', padding: '0px 10px 0 10px' ,display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p>{el[0]}</p>
          {/* <p>{el[3]}</p> */}
          {/* <button onClick={() =>acceptQuestion(el[0])}>Accept</button> */}
          {/* <button onClick={() =>rejectQuestion(el[0])}>Reject</button> */}
        </div>
        <div>
          <p>{el[1]}</p>
          <p>{el[2]}</p>
          <p>{el[3]}</p>
          <p>{el[4]}</p>
          <p>ans: {el[5]}</p>
        </div>
      </div>
    </div>
  </div>
))}

          </div>
        </div>

        
      </div>
    </div>
    </div>
  );

}

export default viewQuiz;