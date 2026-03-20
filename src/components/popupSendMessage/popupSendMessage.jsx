import './popupSendMessage.css'
import React, {useEffect, useRef} from "react";

function popupSendMessage({trigger, setTrigger, children}){
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if click is outside the popup content
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setTrigger(false);
            }
        };

        // Only add listener if popup is open
        if (trigger) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [trigger, setTrigger]);

    return (
        <>
            {trigger && (
                <div className="popup-container">
                    <div className="popup-inner-container" ref={popupRef}>
                        {children}
                    </div>
                </div>
            )}
        </>
    );


}

export default popupSendMessage;