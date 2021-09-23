import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
    const [repositoryUrl, setRepositoryUrl] = useState('');

    return (
        <form
            className="ui form large"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(repositoryUrl);
            }}
        >
            <div className="segment">
                <div className="field">
                    <div className="ui input">
                        <input
                            placeholder="Enter a GitHub repository URL"
                            value={repositoryUrl}
                            onChange={(e) => setRepositoryUrl(e.target.value)}
                        />
                    </div>
                </div>
                <div className="field">
                    <button
                        className="ui button large primary"
                        disabled={!repositoryUrl}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Form;
