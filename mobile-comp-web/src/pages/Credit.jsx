import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

function Credit(props) {
    let navigate = useNavigate()
    return (<div>
        <Sidebar />
        <div style={{ marginLeft: '200px', padding: '20px' }}>
            <h1>Credit Page</h1>
        </div>
        <p>
            test test test
        </p>
    </div>)
}

export default Credit;