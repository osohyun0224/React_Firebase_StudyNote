import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function DiaryForm({ uid }) {

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { addDocument, response } = useFirestore("diary");


  // 데이터를 firestore로 전송합니다
  const submitData = (event) => {
    event.preventDefault();
    console.log(title,text);
    addDocument({
      uid,
      title,
      text
    });
  }

  // 문서가 추가되면 인풋을 초기화합니다
  useEffect(() => {
    if(response.success){
      setTitle('');
      setText('');
    }
  }, [response.success])


  // 2개밖에 없으니 인라인으로 처리 (signup의 handle과는 달리)
  return (
    <form onSubmit={submitData}>
      <fieldset>
        <legend>수업 복습장 쓰기</legend>
        <label htmlFor="tit">수업 제목</label>
        <input id="tit" type="text" required value={title} onChange={(event) => {setTitle(event.target.value)}}/>
        <label htmlFor="txt">수업 내용</label>
        <textarea id="txt" required value={text} onChange={(event) => {setText(event.target.value)}}></textarea>

        <button type="submit">저장하기</button>
      </fieldset>
    </form>
  )
}