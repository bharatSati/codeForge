import { createContext , useState} from "react";
export const TopicDataContext = createContext();

export function TopicDataProvider({children}){
    const [ topicData , setTopicData ] = useState(null);
    return(
        <TopicDataContext.Provider value = {{ topicData , setTopicData }}>
          {children}
        </TopicDataContext.Provider>
    )

}