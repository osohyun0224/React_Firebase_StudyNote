import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { appFireStore } from "../firebase/config";

export const useCollection = (transaction, myQuery) => {

  const [documents, setDocument] = useState(null); 
  const [error, setError] = useState(null);

  
  useEffect(() => {

    let q;
    if(myQuery){
      q = query(collection(appFireStore, transaction), where(...myQuery), orderBy("createdTime", 'desc'))
    }

    const unsubscribe = onSnapshot((myQuery ? q : collection(appFireStore, transaction)), 
    
   
    (snapshot) => {
      let result = [];

     
      snapshot.docs.forEach((doc)=> {

       
        result.push({...doc.data(), id: doc.id});
      })

      setDocument(result);
      setError(null);
    },
    (error) => {
      setError(error.message)
    });

    return unsubscribe;
  
  }, [collection])

  return {documents, error}
}