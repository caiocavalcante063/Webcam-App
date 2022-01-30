import React, { useState, useEffect } from 'react';
import Webcam from "react-webcam";

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user"
};

function WebcamCapture() {
  const [images, setImages] = useState([]);
  const webcamRef = React.useRef(null);

  const postImg = async (src) => {
    await fetch(`http://localhost:3001/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        src
      })
    });
  }

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImages(() => [...images, imageSrc]);

    await postImg(imageSrc)
  };

  const getImgs = async () => {
    const result = await fetch(`http://localhost:3001/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await result.json();

    const imgArr = [];

    data.map(({ src }) => imgArr.push(src));

    setImages(() => [...imgArr])
  }

  useEffect(() => {
    getImgs();
  }, []);

  const removeImg = async ({ target: { value } }) => {
    const src = value;

    await fetch(`http://localhost:3001/`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        src
      })
    });

    getImgs();
  }


  return (
    <div className="webcam-container">
      <div className="webcam-container">
        <Webcam
          audio={false}
          height={500}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={500}
          videoConstraints={videoConstraints}
        />
      </div>
      <button type="button" onClick={() => capture()}>Capturar</button>
      <div className="captured-images-container">
        {images.map((img, i) => (
          <div key={i} className="img-container">
            <img src={img} alt="user" />
            <button
              type="button"
              value={img}
              onClick={(e) => removeImg(e)}
            >
              remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WebcamCapture;
