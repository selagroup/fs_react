import React from 'react'
import User from './users/components/User'

const App: React.FC = () => {
    let style = {
        width: '600px',
        margin: `10px auto`
    }
    return (
        <div style={style}>
            <h1> User Admin </h1>
            <User />
        </div>
    )
}

export default App;
