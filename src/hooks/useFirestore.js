
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

// transaction 인자 : 컬렉션에 넣을거
export const useFirestore = (transaction) => {
  const [response, dispatch] = useReducer(storeReducer, initState);

  // 컬렉션의 레퍼런스 만들기.
  // colRef: 우리가 만들 컬렉션의 참조.울기ㅏ 빠로 컬렉션을 만들지는 앟ㄴ지만 원하는 컬렉션의 참고를 요구하시만 해도 자동으로 해당 컬렉션을 생성해줌.
  const colRef = collection (appFireStore, transaction);

  // 컬렉션에 문서를 추가
  const addDocument = async (doc) => {
    dispatch({ type: "isPending" });

    try {
        const createdTime = timeStamp.fromDate(new Date())

        // docRef: 우리가 만들 문서의 참조입니다.
        // addDoc: 컬렉션에 문서를 추가합니다.
        const docRef = await addDoc(colRef, { ...doc, createdTime });
        dispatch({ type: "addDoc", payload: docRef });

    } catch (error) {
        dispatch({ type: "error", payload: error.message });
    }
}
  // 컬렉션에 문서 제거
  const deleteDocument = async (id) => {
    dispatch({type:"isPending"});

    try {
      const docRef = await deleteDoc (doc(colRef, id))
      dispatch({type: "deleteDoc", payload: docRef})
    }catch (error) {
      dispatch({type: "error", payload:error.message })
    }
  }

  // 기본 틀
  return {response , addDocument, deleteDocument};

}