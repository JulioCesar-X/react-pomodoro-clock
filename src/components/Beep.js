import React, { forwardRef } from "react";

const Beep = forwardRef((props, ref) => (
  <audio id="beep" ref={ref} src="/beep.mp3" preload="auto">
    Seu navegador não suporta o elemento de áudio.
  </audio>
));

export default Beep;