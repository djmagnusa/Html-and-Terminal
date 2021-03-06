const root = document.getElementById('root');


class App extends React.Component {

    state = {
        location: "",
        command: "",
        output: "",
    }

    handleSubmit = () => {

        const setting = {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        };

        axios.get(`http://localhost:5000/run/?command=${this.state.command}&&location=${this.state.location}`, setting)
            .then(res => {
                console.log(res.data);
                this.setState({ output: res.data.op.text });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="main" >
                <div className="container-md frm" >
                    <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Type Location"
                        onChange={(e) => { this.setState({ location: e.target.value }) }}                       
                    ></input>
                    <input
                        type="text"
                        id="command"
                        name="command"
                        placeholder="Type Command"
                        onChange={(e) => { this.setState({ command: e.target.value }) }}
                        onKeyPress={(e) => {
                            if (e.key == "Enter") this.handleSubmit();
                        }}
                    ></input>
                    <button className="btn btn-success" onClick={() => this.handleSubmit()} >Run</button>
                    <button className="btn btn-primary"
                        onClick={() => this.setState({ output: "" })}>
                        Clear
                    </button>
                </div>
                <div className="container-md op" ><pre> {this.state.output} </pre> </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, root);