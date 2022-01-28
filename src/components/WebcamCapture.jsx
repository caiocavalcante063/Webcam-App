import React, { useState } from 'react';
import Webcam from "react-webcam";

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user"
};

function WebcamCapture() {
  const [images, setImages] = useState([]);
  const webcamRef = React.useRef(null);


  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImages(() => [...images, imageSrc])
  };


  return (
    <div className="webcam-container">
      <div className="webcam-container">
        <Webcam
          audio={false}
          height={200}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={220}
          videoConstraints={videoConstraints}
        />
      </div>
      <button type="button" onClick={() => capture()}>Capturar</button>
      <div className="captured-images-container">
        {images.map((img) => <img src={img} alt="user" />)}
      </div>
    </div>
  );
}

export default WebcamCapture;
