import React, { useEffect, useRef } from "react";
import "./index.css";

const attrs = {
  repo: "jyhwng/jyhwng.github.io",
  crossorigin: "anonymous",
  "issue-term": "title",
  theme: "github-light"
};

export const Comment = () => {
  const commentEl = useRef(null);
  useEffect(() => {
    const scriptEl = document.createElement("script");
    scriptEl.src = "https://utteranc.es/client.js";
    scriptEl.async = true;
    Object.entries(attrs).forEach(attr => {
      scriptEl.setAttribute(attr[0], attr[1]);
    });
    commentEl.current.appendChild(scriptEl);
  }, []);
  return <div ref={commentEl} />;
};
