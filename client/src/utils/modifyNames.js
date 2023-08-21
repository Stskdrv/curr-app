
const modifyNames = (namesObj) => {
    return Object.entries(namesObj).map(([abw, name]) => ({
        abw,
        name
    }));
};

export default modifyNames;
