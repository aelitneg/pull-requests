import React, { useState, useEffect } from 'react';
import './app.css';
import { getPulls } from './lib/api';

import Form from './components/Form';
import PullList from './components/Pull/PullList';

function App() {
    const [repositoryUrl, setRepositoryUrl] = useState('');
    const [showPulls, setShowPulls] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pulls, setPulls] = useState([]);

    useEffect(() => {
        (async () => {
            if (!repositoryUrl) {
                return;
            }

            setLoading(true);
            setShowPulls(true);

            setPulls(await getPulls(repositoryUrl));

            setLoading(false);
        })();
    }, [repositoryUrl]);

    const renderResults = () => {
        if (!showPulls) {
            return null;
        }

        if (loading) {
            return (
                <div className="ui text container center aligned">
                    <h3>Loading...</h3>
                </div>
            );
        }

        return <PullList items={pulls} />;
    };

    return (
        <div className="ui container fluid">
            <div className="ui inverted vertical center aligned segment">
                <div className="ui container">
                    <div className="ui text container">
                        <h1>Pull Requests</h1>
                        <Form onSubmit={(url) => setRepositoryUrl(url)} />
                    </div>
                </div>
            </div>
            <div className="ui container mt">{renderResults()}</div>
        </div>
    );
}

export default App;
