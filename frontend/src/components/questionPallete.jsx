import "../componentsCSS/questionPallete.css"


export default function QuestionPallete({ questions }){

    return(
        <div className="questionPallete">
       
            
            <div className="headingProblemRow">
                <div className="headingProblem">Problem</div>
                <div className="headingAcceptanceRate">Acceptance&nbsp; Ratio</div>
                <div className="headingSolution">Solution</div>
            </div>

        {questions && questions.map((e,i)=>{
            return (
                <div key = {i} className="problemRow">
                    <a className="problem" href={`https://codeforces.com/contest/${e.contestId}/problem/${e.index}`} target="_blank" rel="noopener noreferrer">`${i+1}. {e.question}` </a>
                    <div className="acceptanceRate">{e.acceptanceRate}</div>
                    <a className="solution" href={`https://codeforces.com/contest/${e.contestId}/submission/${e.solution}`} target="_blank" rel="noopener noreferrer">LINK</a>
                </div>

            )

        })}

        </div>
    )

}