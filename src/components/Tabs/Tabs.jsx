import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";

function Tabs({ children, defaultIndex = 0, onChange }) {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const Tabs = React.Children.toArray(children);

  const prevIndex = useRef(defaultIndex);
  useEffect(() => {
    if (prevIndex.current !== currentIndex) {
      onChange(currentIndex);
    }
    prevIndex.current = currentIndex;
  }, [currentIndex, onChange]);
  return (
    <div className="containerTabs">
      <div className="tabList">
        {Tabs.map((tab, index) => {
          const active = currentIndex === index ? true : false;
          return (
            <Button
              tabButton
              key={index}
              style={{
                fontSize: active ? "20px" : "12px",
                color: active ? "red" : "#fff",
              }}
              onClick={() => setCurrentIndex(index)}
            >
              {tab.props.title}
            </Button>
          );
        })}
      </div>
      <div className="contentTab">{Tabs[currentIndex]}</div>
    </div>
  );
}

export default Tabs;
