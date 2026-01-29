import { createContext , useState } from 'react'
export const RatedDataContext = createContext();

export function RatedDataProvider({children}){
    const [ ratedData,setRatedData ] = useState(null);
    return(
        <RatedDataContext.Provider value = {{ratedData , setRatedData}}>
            {children}
        </RatedDataContext.Provider>
    )

}

