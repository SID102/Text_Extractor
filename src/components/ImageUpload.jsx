import React, { useState } from "react";
import "../Style/ImageUpload1.css";
import Tesseract from 'tesseract.js';

const  ImageUpload=()=>{
    const[selectedImage, setSelectedImage] = useState(null);
    const[ExtractedText, setExtractedText] = useState('');
    const[ImageHeight,SetImageHeight] = useState('100px');
    const[textContainerHeight,SetTextContainerHeight] = useState('50px');
   const handelImageChange = (event) => {
     if(event.target.files&&event.target.files[0])
     {
       let img=event.target.files[0];
       console.log('Selected Image:', img);
       setSelectedImage(URL.createObjectURL(img));
       SetImageHeight('auto');
       Tesseract.recognize(img,'eng',{logger:m=>console.log(m)}).then(({data:{text}})=>{setExtractedText(text);SetTextContainerHeight('auto');}
          )
     }
   };
  const downloadTxtFile = () => {
      const element = document.createElement("a");
      const file = new Blob([ExtractedText], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "extractedText.txt";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
  };
  return(
     <div className="first">
       <h2>Upload Image</h2>
       <input type="file" accept="image/*" onChange={handelImageChange} /> 
       {selectedImage&&(
         <div style={{ height: ImageHeight, overflow: 'hidden' }}>
           <h5>Preview:</h5>
           <img
             src={selectedImage}
             alt="preview"
             style={{ maxWidth: '250px', height: 'auto', maxHeight: '250px' }}
             onLoad={() => SetImageHeight('auto')}/>
         </div>)}
       {ExtractedText&&(
       <div  styel={{height:textContainerHeight,overflow:'hidden'}}>
         <h5>Extracted Text:</h5>
         <button onClick={downloadTxtFile}>DownalodText</button>
       </div>)}
     </div>
    
  )
}

export default ImageUpload;
