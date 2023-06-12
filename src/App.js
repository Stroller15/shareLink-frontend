import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();

  const url =
    "https://img.freepik.com/premium-vector/smartphones-file-transfer-data-transmission-ftp-files-receiver-phone-backup-copy-document-sha_189959-134.jpg"; 

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  return (
    <div className='container'>
      <img src={url} className='img' alt='img'/>
      <div className='wrapper'>
        <h1>Simple file sharing app!</h1>
        <p>Upload the file and share the download link.</p>
        
        <button  onClick={() => onUploadClick()}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <a rel='noreferrer' href={result} target='_blank'>{result}</a> 
      </div>
    </div>
  );
}



export default App;
