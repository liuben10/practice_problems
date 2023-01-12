import './StateRenderer.css'
import CodeWindow from 'react-code-window';

function StateRenderer(props) {
    return <CodeWindow className="StateRenderer">
        {JSON.stringify(props.state, null,1)}
    </CodeWindow>
}

export {StateRenderer};