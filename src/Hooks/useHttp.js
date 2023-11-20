import { useState, useCallback } from "react";

export default function useHttp(){

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async (requestData, dataHandler) =>{
        setIsLoading(true);
        try{
            const response = await fetch(requestData.link,{
                method: requestData.method ? requestData.method : "GET",
                headers: requestData.headers ? requestData.headers: {},
                body: requestData.body ? JSON.stringify(requestData.body): null
            })
            if(!response.ok){
                throw new Error ("some thing went wrong")
            }
            const data = await response.json();

            dataHandler(data);
        }
        catch(err){
            setError(err.message || "some thing went wrong")
        }

        setIsLoading(false);
    },[])

    return ({error, isLoading, fetchData});
}