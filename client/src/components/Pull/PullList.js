import PullListItem from './PullListItem';

const PullList = ({ items = [] }) => {
    return (
        <div className="ui list">
            {items.map((item) => (
                <PullListItem key={item.id} item={item} />
            ))}
        </div>
    );
};

export default PullList;
