//https://dev.to/danielasaboro/uploading-handling-and-storing-files-in-nodejs-using-multer-the-step-by-step-handbook-ob5
//https://dev.to/ndohjapan/file-upload-with-multer-node-js-ad-express-f1e
//https://www.linkedin.com/pulse/file-uploads-made-easy-multer-package-nodejs-vinayak-sharma/
//https://github.com/expressjs/multer/issues/302
//https://www.tutorialspoint.com/nodejs/pdf/nodejs_response_object.pdf
import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import data from './SampleData';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

export default function Viewer() {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [formData, setFormData] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const goToPrevPage = () => setPageNumber((prevPage) => prevPage - 1);
    const goToNextPage = () => setPageNumber((prevPage) => prevPage + 1);

    useEffect(() => {
        let form = {}
        data.attributes.map(field => form[field.id] = field.value)
        setFormData({ ...form });
    }, [])

    return (
        <div className="text-center w-full">
            <div className="row w-full">
                <div className="col">
                    {
                        formData !== null &&
                        (
                            <form className='m-4 p-2 h-50 text-center d-flex flex-column 
                            justify-content-center border border-2'>
                                <div className='h-full overflow-y-auto mb-2'>
                                    {
                                        data.attributes.map(field =>
                                            <div className="mb-3 d-flex flex-column px-2">
                                                <label htmlFor={`${field.id}`} className="form-label text-start">{field.id}</label>
                                                <input type="text" className="form-control" value={`${field.value === null ? "" : field.value}`} id={`${field.id}`} />
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='w-full text-end mt-2 px-1'>
                                    <button type="submit" className="btn btn-primary sticky-bottom">Validate</button>
                                </div>
                            </form>
                        )
                    }
                </div>
                <div className="col-7 pt-2">
                    <nav>
                        <button onClick={goToPrevPage}>Prev</button>
                        <button onClick={goToNextPage}>Next</button>
                    </nav>

                    <div className='d-flex justify-content-center align-items-center'>
                        <Document
                            file='./uploads/health_report.pdf'
                            onLoadSuccess={onDocumentLoadSuccess}
                        >
                            <Page pageNumber={pageNumber} renderTextLayer={false}
                                renderAnnotationLayer={false}
                                customTextRenderer={false}
                            />
                        </Document>
                    </div>
                    <p>
                        Page {pageNumber} of {numPages}
                    </p>
                </div>
            </div>
        </div>
    );
}