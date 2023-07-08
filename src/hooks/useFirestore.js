
// document : 파이어스토어에서 document 생성을 요청하면 우리가 생성한 document를 반환.
// isPending: 통신이 이루어지고 있는 상태
// success: 파이어스토어 요청에 대한 응답의 성공 유무
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"
import { useReducer } from "react"
import { appFireStore, timeStamp } from "../firebase/config"

// 전체적으로 Reducer로 관리예정.
const initState = {
  document: null,
  isPending: false,
  error: null,
  success: false
}

const storeReducer = (state, action) => {
  switch(action.type){
    case 'isPending':
        return {isPending: true, document: null, success: false, error: null}
    case 'addDoc':
        return {isPending: false, document: action.payload, success: true, error: null}
    case 'error':
      return {isPending: false, document: null, success: false, error: action.payload}
    case 'deleteDoc':
      return {isPending: false, document: action.payload, success: true, error: null}
    default:
        return state
  }
}


export const useFirestore = (transaction) => {
  const [response, dispatch] = useReducer(storeReducer, initState);

  const colRef = collection (appFireStore, transaction);


  const addDocument = async (doc) => {
    dispatch({ type: "isPending" });

    try {
        const createdTime = timeStamp.fromDate(new Date())

       
        const docRef = await addDoc(colRef, { ...doc, createdTime });
        dispatch({ type: "addDoc", payload: docRef });

    } catch (error) {
        dispatch({ type: "error", payload: error.message });
    }
}

  const deleteDocument = async (id) => {
    dispatch({type:"isPending"});

    try {
      const docRef = await deleteDoc (doc(colRef, id))
      dispatch({type: "deleteDoc", payload: docRef})
    }catch (error) {
      dispatch({type: "error", payload:error.message })
    }
  }


  return {response , addDocument, deleteDocument};

}