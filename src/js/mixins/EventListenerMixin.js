export default (eventName) => {

    return {
        getInitialState() {
            return {
                error: null,
                success: false
            };
        },
        componentDidMount() { document.addEventListener(eventName, this.onEvent); },
        componentWillUnmount() { document.removeEventListener(eventName, this.onEvent); }
    };

};
