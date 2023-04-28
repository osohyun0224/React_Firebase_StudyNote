import { useFirestore } from '../../hooks/useFirestore';
import styles from './Home.module.css';


export default function DiaryList({ diaries }){

  const { deleteDocument } = useFirestore('diary');



  return (
    <>
      {
        diaries.map((item) => {
          return(
            <li key={item.id}>
              <strong className={styles.title}>{item.title}</strong>
              <p className={styles.text}>{item.text}</p>
              <button onClick={()=>deleteDocument(item.id)}>X</button>
            </li>
          )
        })
      }
    </>
  )
}