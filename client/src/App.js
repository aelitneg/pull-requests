import Form from './components/Form';

const onSubmit = (repositoryUrl) => {
    // TODO: Call API
};

function App() {
    return (
        <div className="ui inverted vertical center aligned segment">
            <div className="ui container">
                <div className="ui text container">
                    <h1>Pull Requests</h1>
                    <Form onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    );
}

export default App;
