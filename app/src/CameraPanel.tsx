import { useEffect, useRef, useState } from "react";
import "./CameraPanel.css";

type CameraPanelProps = {
  caption?: string;
};

function CameraPanel({ caption = "Settle in and get comfortable." }: CameraPanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraError, setCameraError] = useState("");

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        setCameraError("Camera access is needed for live wellbeing readings.");
      }
    }

    startCamera();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="camera-panel">
      {cameraError ? (
        <div className="camera-message">
          <span className="camera-symbol">◉</span>
          <strong>Camera unavailable</strong>
          <p>{cameraError}</p>
        </div>
      ) : (
        <video ref={videoRef} autoPlay muted playsInline />
      )}

      <div className="camera-caption">{caption}</div>
    </div>
  );
}

export default CameraPanel;
