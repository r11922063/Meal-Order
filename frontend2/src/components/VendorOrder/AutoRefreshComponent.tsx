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
    </div>
  );
};

export default AutoRefreshComponent;