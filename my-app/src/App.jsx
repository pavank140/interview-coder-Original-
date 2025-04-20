import { useState } from "react";
import "./App.css";

function App() {
  const [screenshots, setScreenshots] = useState([]);
  const [analyzed, setAnalyzed] = useState(false);

  const takeScreenshot = async () => {
    await window.electronAPI.takeScreenshot?.();

    const result = await window.electronAPI.getScreenshots?.();
    if (result?.success && result.previews?.length) {
      setScreenshots(result.previews); // preview is already included
      await window.electronAPI.setWindowSize?.(700, 500);
    }
  };

  const startOver = async () => {
    await window.electronAPI.clearQueues?.();
    setScreenshots([]);
    setAnalyzed(false);
    await window.electronAPI.setWindowSize?.(700, 60);
  };

  const solve = () => {
    setAnalyzed(true);
    window.electronAPI.setWindowSize?.(700, 700);
  };

  return (
    <div>
      {screenshots.length > 0 && (
        <div style={previewStyle}>
          <img
            src={screenshots[0].preview}
            alt="Screenshot"
            style={{ width: "140px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>
      )}

      <div style={toolbarStyle}>
        <div style={groupStyle} onClick={takeScreenshot}>
          <span style={{ cursor: "pointer" }}>
            {screenshots.length > 0 ? "Take second screenshot" : "Take first screenshot"}
          </span>
          <kbd style={kbdStyle}>⌘</kbd>
          <kbd style={kbdStyle}>H</kbd>
        </div>

        <div style={groupStyle} onClick={startOver}>
          <span>Start over</span>
          <kbd style={kbdStyle}>⌘</kbd>
          <kbd style={kbdStyle}>G</kbd>
        </div>

        <div style={groupStyle} onClick={solve}>
          <span>Solve</span>
          <kbd style={kbdStyle}>⌘</kbd>
          <kbd style={kbdStyle}>⏎</kbd>
        </div>

        <div style={{ flex: 1 }} />
        <div style={iconStyle}>⚙️</div>
      </div>

      {analyzed && (
        <div style={analysisBoxStyle}>
          <h3>Analyzing Problem (⌘ + Arrow keys to scroll)</h3>
          <p><strong>Not available</strong></p>
          <h4>My Thoughts</h4>
          <ul>
            <li>The image appears to be a screenshot of a development environment.</li>
            <li>Text recognition or code parsing may be needed.</li>
          </ul>
          <h4>Complexity</h4>
          <p><strong>Time:</strong> Not available</p>
        </div>
      )}
    </div>
  );
}

// 💅 Styling
const toolbarStyle = {
  position: "fixed",
  top: 0,
  left: "150px",
  width: "calc(100% - 150px)",
  height: "60px",
  backdropFilter: "blur(8px)",
  backgroundColor: "rgba(30,30,30,0.7)",
  color: "white",
  display: "flex",
  alignItems: "center",
  padding: "10px 20px",
  gap: "20px",
  zIndex: 999,
  borderRadius: "12px",
};

const previewStyle = {
  position: "fixed",
  top: "10px",
  left: "10px",
  zIndex: 999,
};

const groupStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const kbdStyle = {
  background: "#333",
  padding: "4px 8px",
  borderRadius: "6px",
  fontSize: "0.8rem",
  fontWeight: "bold",
};

const iconStyle = {
  fontSize: "1.2rem",
  cursor: "pointer",
};

const analysisBoxStyle = {
  marginTop: "100px",
  background: "#2e2e2e",
  padding: "20px",
  color: "#fff",
  borderRadius: "8px",
  width: "90%",
  margin: "auto",
};

export default App;
