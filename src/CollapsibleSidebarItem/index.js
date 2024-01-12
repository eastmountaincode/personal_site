import React, { useEffect, useState } from 'react';

const CollapsibleSidebarItem = ({ label, children, openStateSignal, triggerSignal }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open && !openStateSignal) {
            setOpen(false)
        }
        else if (!open && openStateSignal) {
            setOpen(true)
        }
    }, [triggerSignal]);

    const toggleOpen = () => setOpen(!open);

    const labelStyle = {
        cursor: 'pointer',
        textDecoration: 'none', // No underline by default
        userSelect: 'none'
    };

    const hoverStyle = {
        textDecoration: 'underline' // Underline on hover
    };

    const innerStyle = {
        marginLeft: '15px', // Adjust this value as needed for indentation
        userSelect: 'none'
    };

    return (
        <div>
            <div 
              onClick={toggleOpen} 
              style={labelStyle}
              onMouseEnter={(e) => e.target.style.textDecoration = hoverStyle.textDecoration}
              onMouseLeave={(e) => e.target.style.textDecoration = labelStyle.textDecoration}
            >
                <p>{label}{open ? " ⇱" : " ⇲"}</p>
            </div>
            {open && <div className="toggle" style={innerStyle}>{children}</div>}
        </div>
    );
};

export default CollapsibleSidebarItem;

