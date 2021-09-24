const Pull = ({ item }) => {
    if (!item) {
        return null;
    }

    const renderCommitText = () => {
        const len = item.commits.length;
        return `${len} Commit${len > 1 ? 's' : ''}`;
    };

    return (
        <div className="item">
            <img
                className="ui avatar image"
                src={item.user.avatar_url}
                alt={item.user.login}
            />
            <div className="content">
                <a
                    className="header"
                    href={item.html_url}
                    target="_blank"
                    rel="noreferrer"
                >
                    {item.title}
                </a>
                <div className="description">{renderCommitText()}</div>
            </div>
        </div>
    );
};

export default Pull;
