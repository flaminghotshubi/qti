import axios from 'axios';


function extractText(event) {
    const file = event.target.files[0]
    let formData = new FormData();
    axios.post("/extract-pdf-text", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
        .then((response) => {
            console.log(response.data);
        })
        .catch(error => {
            window.alert("Error occurred while creating project!");
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        })
}

export default function PDFParserReact() {

    return (
        <div className="App">
            <header className="App-header">
                <input type="file" accept="application/pdf" onChange={extractText} />
            </header>
        </div>
    );
}