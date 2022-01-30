import React, { useState, useEffect, useRef } from 'react';
import Webcam from "react-webcam";
import cameraIcon from "../images/camera-icon.svg";
import deleteIcon from "../images/delete-icon.svg";

// foi utilizado o módulo react-webcam para lidar com a captura da webcam da
// pessoa usuária

// parâmetros para o componente Webcam
const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user"
};

function WebcamCapture() {
  const [images, setImages] = useState([]);
  const webcamRef = useRef(null);

  // função responsável por enviar a imagem para o banco de dados
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

  // função responsável por salvar a imagem no estado da aplicação e
  // postar a imagem no banco de dados através da função postImg
  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImages(() => [...images, imageSrc]);

    await postImg(imageSrc)
  };

  // função responsável por recuperar todas as imagens salvas no banco de
  // dados e enviar para o estado da aplicação
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

  // as imagens são recuperadas do banco de dados assim que a aplicação é
  // carregada
  useEffect(() => {
    getImgs();
  }, []);

  // função responsável por remover a imagem selecionada do banco de dados
  const removeImg = async (e) => {
    e.preventDefault();
    const src = e.currentTarget.value;

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

    // assim que a imagem é removida do banco de dados, uma nova chamada ao
    // banco de dados é feita para atualizar o estado da aplicação
    getImgs();
  }


  return (
    <div className="main-container">
      <div className="webcam-container">
        <Webcam
          audio={false}
          height={500}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={500}
          videoConstraints={videoConstraints}
        />
        <button
          type="button"
          onClick={() => capture()}
          className="capture-button"
        >
          <img src={cameraIcon} alt="camera" width="40px" />
        </button>
      </div>
      {images.map((img, i) => (
        <div key={i} className="captured-img-container">
          <img src={img} alt="user" />
          <button
            type="button"
            className="delete-button"
            value={img}
            onClick={(e) => removeImg(e)}
          >
            <img src={deleteIcon} alt="delete" width="35px" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default WebcamCapture;
