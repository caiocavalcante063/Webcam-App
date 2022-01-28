import React, { useRef, useEffect, useState } from "react";

function App() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ 
        video: {
          height: 1080,
          width: 1920,
        } 
      })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => console.error(err))
  }

  const takePhoto = () => {
    const width = 414;
    // resolução 16:9
    const height = width / (16/9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.height = height;
    photo.width = width;

    let context = photo.getContext('2d');
    context.drawImage(video, 0, 0, width, height);

    setHasPhoto(true);
  }

  useEffect(() => {
    getVideo();
    console.log(photoRef)
  }, [videoRef])

  return (
    <div className="App">
      <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={takePhoto}>Capturar</button>
      </div>
      <div className={`result${hasPhoto ? " hasPhoto" : ""}`}>
        <canvas ref={photoRef}></canvas>
        <button>Fechar</button>
      </div>
    </div>
  );
}

export default App;
