import { useEffect, useState } from "react";

export default function SecretImage() {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    let keys = "";

    function handleKeyDown(event) {
      const key = event.key.toLowerCase();

      keys += key;

      keys = keys.slice(-3);

      if (keys === "rml") {
        setShowImage(true);
        keys = "";
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {showImage && (
        <div
          onClick={() => setShowImage(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            cursor: "pointer"
          }}
        >
          <img
            src="/secret.png"
            alt="Imagem secreta"
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
              borderRadius: "15px"
            }}
          />
        </div>
      )}
    </>
  );
}