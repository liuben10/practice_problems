import './ProblemDemo.css';

function ProblemDemo(props) {
    return (<div className="ProblemDemo">
        {props.innerContent.map((d, idx) => d)}
        </div>)
}

export { ProblemDemo };