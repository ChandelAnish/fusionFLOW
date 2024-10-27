// import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { blurbsSliceAction } from "../store/Blurbs";
import { useQuery } from "@tanstack/react-query";

const useAddInitialBlurbs = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //     const addInitialBlurbs = async () => {
  //         try {
  //             const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/blurb`,{
  //                 credentials:"include"
  //             });
  //             const initialBlurbs = await response.json();
  //             if(initialBlurbs.signin===false)
  //             {
  //                 window.open('/signin', '_parent')
  //                 return;
  //             }
  //             dispatch(blurbsSliceAction.addInitialBlurbs(initialBlurbs))
  //         } catch (error) {
  //             console.log("error occurred : ", error)
  //         }
  //     }
  //     addInitialBlurbs()
  // }, [])

  const addInitialBlurbs = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/blurb`, {
      credentials: "include",
    });
    const initialBlurbs = await response.json();
    if (initialBlurbs.signin === false) {
      window.open("/signin", "_parent");
      // window.open("https://fusionflow-signin.onrender.com", "_parent");
      return [];
    }
    dispatch(blurbsSliceAction.addInitialBlurbs(initialBlurbs));
    return initialBlurbs; //must return in queryFn
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["blurbs"],// React Query manages query caching for you based on query keys. Query keys can be as simple as a string, or as complex as an array of many strings and nested objects. As long as the query key is serializable, and unique to the query's data, you can use it!
    //i.e queryKey is used to uniquely identify the cached data i.e it is used as cache key to identify the cached data
    queryFn: addInitialBlurbs,
    // staleTime: 10000,//staleTime is time in ms after which data is considered stale and must be fetched from the server not from the cache.
    //if data is not stale then it take the cached data itself
    //stale can also be passed in the queryClient
  });

  return [isLoading, error];
};

export default useAddInitialBlurbs;
