import './StateRenderer.css';

function StateRenderer(props) {
    return <code className="StateRenderer">
        {JSON.stringify(props.state, null,1)}
    </code>
}

export {StateRenderer};