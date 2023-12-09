import React, { useEffect } from 'react';

const AutoRefreshComponent = () => {
    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log("Auto refrash");
            window.location.reload();
        }, 20000); // 60000毫秒=1分鐘
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
        <p>This is an auto refrash component</p>
    </div>
  );
};

export default AutoRefreshComponent;