import { useEffect, useState } from "react";
import { debounce } from "lodash";

export const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    
    const handleResize = () => setWidth(window.innerWidth);

    const debouncedHandleResize = debounce(handleResize, 100);

    useEffect(() => {
        window.addEventListener("resize", debouncedHandleResize);
        return () => window.removeEventListener("resize", debouncedHandleResize);
    }, []);
 
    return width;
}