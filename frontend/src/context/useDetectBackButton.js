import { useEffect } from "react";

export function useDetectBackButton(onBack) {
  useEffect(() => {
    const handlePopState = (event) => {
      console.log("Back button was pressed!");
      if (typeof onBack === "function") {
        onBack(event);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [onBack]);
}
