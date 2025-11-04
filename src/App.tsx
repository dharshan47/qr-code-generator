import { useState } from "react";
import { FiDownload, FiCopy, FiCheck, FiX } from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";
import { QRCodeCanvas } from "qrcode.react";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const pngURL = canvas
      ?.toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = pngURL;
    link.download = "qr-code.png";
    link.click();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    setInputText("");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-bl from-rose-400 to-indigo-400 p-4 sm:p-6">
      <div className="bg-white max-w-sm sm:max-w-md p-4 sm:p-8 flex flex-col items-center w-full rounded-3xl shadow-xl shadow-black/40 hover:shadow-2xl hover:scale-105 transition-all duration-400 ease-in-out">
        <div className="flex items-center justify-center mb-6 flex-col">
          <div className="rounded-full bg-gradient-to-r from-rose-400 to-indigo-400 flex items-center justify-center w-18 h-18 text-white mb-2">
            {<BsQrCode className="w-10 h-10" />}
          </div>
          <h1 className="text-xl font-semibold mb-2">QR Code Generator</h1>
          <p className="text-sm text-gray-400">
            Enter a text or URL to create a QR
          </p>
        </div>
        <textarea
          placeholder="Type a text or URL.."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full border border-gray-200 bg-gray-100 rounded-xl shadow-md px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none resize-none transition duration-400 text-gray-700 placeholder:text-gray-400 mb-5"
        />
        <div className="mb-5 flex items-center justify-center w-full">
          <div className="bg-white border border-gray-200 rounded-xl shadow-md min-h-[150px] sm:min-h-[200px] p-3 w-full flex items-center justify-center">
            {inputText.trim() ? (
              <QRCodeCanvas
                value={inputText}
                size={200}
                className="rounded w-full"
              />
            ) : (
              <BsQrCode className="w-16 h-16 mb-2 text-gray-300" />
            )}
          </div>
        </div>
        <div className=" flex sm:flex-row flex-col w-full gap-3 mb-2">
          <button
            className="flex-1 flex items-center justify-center bg-blue-500 hover:bg-blue-600 px-4 py-2 gap-2 rounded-lg shadow-md text-white disabled:text-gray-400 disabled:bg-gray-200"
            disabled={!inputText}
            onClick={handleDownload}
          >
            <FiDownload className="w-4 h-4" />
            Download
          </button>
          <button
            className="flex-1 flex items-center justify-center bg-gray-100 hover:bg-blue-200 px-4 py-2 gap-2 rounded-lg shadow-md text-gray-700 disabled:text-gray-400 disabled:bg-gray-200"
            disabled={!inputText}
            onClick={handleCopy}
          >
            {copied ? (
              <FiCheck className="w-4 h-4 text-green-500" />
            ) : (
              <FiCopy className="w-4 h-4" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            className="flex-1 flex items-center justify-center bg-red-50 hover:bg-red-100 px-4 py-2 gap-2 rounded-lg shadow-md text-red-500 disabled:text-gray-400 disabled:bg-gray-200"
            disabled={!inputText}
            onClick={handleClear}
          >
            <FiX className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
