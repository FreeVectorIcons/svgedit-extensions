export const showViewSourceDialog = (source) => {
  const $dialog = document.getElementById("se-svg-view-source-dialog");
  if ($dialog.getAttribute("dialog") === "open") return;
  $dialog.setAttribute("dialog", "open");
  $dialog.setAttribute("value", source);
};

export const streamSVGValue = ({svgContent, onChunkComplete, onStreamComplete}) => {
  let index = 0;
  function streamNextChunk() {
      const chunkSize = 10; // Stream 10 characters at a time
      if (index < svgContent.length) {
          const nextChunk = svgContent.slice(index, index + chunkSize);
          window.extCodeMirror.setValue({
              value: (window.extCodeMirror.getValue() || "") + nextChunk,
          });
          index += chunkSize;
          setTimeout(streamNextChunk, 50); // Wait 50ms before sending the next chunk
          onChunkComplete();
      } else {
          onStreamComplete();
      }
  }
  // Start streaming
  streamNextChunk();
}
