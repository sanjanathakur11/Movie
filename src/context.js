
import React, { useContext, useEffect, useState } from "react";

export const API_URL=`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;



const AppContext=React.createContext();
const AppProvider =({children})=>{
    const [isLoading, setIsLoading]=useState(true);
    const [movie, setMovie]=useState([]);
    const [isError, setIsError]= useState({show: false, msg:" "});
    const [query , setQuery] =useState("titanic")

    const getMovies=async(url)=>{


        try{
            const res=await fetch(url);
            const data =await res.json();
            console.log(data);

            if(data.Response==="True"){
                setIsLoading(false);
                setMovie(data.Search);
                setIsError({show :false , msg : ""});
            }else{
                setMovie([]);
                setIsError({
                    show: true,
                    msg: " movie not found ",
                })
            }
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
       let timerOut = setTimeout(()=>{
            getMovies(`${API_URL}&s=${query}`);

        } , 800)
        return ()=> clearTimeout(timerOut);
    },[query]);
    return <AppContext.Provider value={{isLoading,isError, movie , query , setQuery}}>
        {children}
    </AppContext.Provider>;
};
const useGlobalContext=()=>{
    return useContext(AppContext);
}
export {AppContext, AppProvider, useGlobalContext};