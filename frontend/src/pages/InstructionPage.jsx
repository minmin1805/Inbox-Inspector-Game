import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function InstructionPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const playerRaw = sessionStorage.getItem("inboxInspectorPlayer");
    if (!playerRaw) {
      navigate("/welcome", { replace: true });
    }
  }, [navigate]);

  const handleStartInvestigation = () => {
    navigate("/game");
  };

  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <h1>InstructionPage</h1>
      <button
        className="rounded-md bg-blue-500 p-2 text-white"
        onClick={handleStartInvestigation}
      >
        Start Investigation
      </button>
    </div>
  );
}

export default InstructionPage;
