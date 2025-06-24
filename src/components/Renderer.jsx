import { createContext, useEffect, useRef, useState } from "react";

const RendererContext = createContext(null);

function Renderer()
{
    const canvasRef = useRef(null);
    const gl = useRef(null);
    
    const [contextReady, setContextReady] = useState(false);

    useEffect(() =>
    {
        const canvas = canvasRef.current;
        const context = canvas.getContext("webgl2");
        if (!context) throw new Error("WebGL2 is not supported on your device");
        gl.current = context;

        const ResizeCallback = () =>
        {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            gl.current.viewport(0, 0, canvas.width, canvas.height);
        }
        ResizeCallback();
        window.addEventListener("resize", ResizeCallback);

        setContextReady(true);

        return () => window.removeEventListener("resize", ResizeCallback);
    }, []);

    return(
        <RendererContext.Provider value={contextReady ? gl.current : null}>
            <canvas
                ref={canvasRef}
                className="w-dvw h-dvh min-w-0 min-h-0"
            ></canvas>
        </RendererContext.Provider>
    );
}

export default Renderer;