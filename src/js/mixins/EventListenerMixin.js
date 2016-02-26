export default (eventName) => {

    return {
        componentDidMount() { document.addEventListener(eventName, this.onEvent); },
        componentWillUnmount() { document.removeEventListener(eventName, this.onEvent); }
    };

};
