import React from 'react';

function MainContent({ mainContentProp }) {
    return (
        <div className="main-content">
            {mainContentProp === "defaultContent" && <p>default</p>}
            {mainContentProp === "content1" && <p>This is Content 1</p>}
            {mainContentProp === "content2" && <p>This is Content 2</p>}
        </div>
    );
}

export default MainContent;
