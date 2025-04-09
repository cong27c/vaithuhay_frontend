import React from "react";
import { Tab, Tabs } from "~/components/Tabs";

function PartTimeJobs() {
  const courses = [
    { id: 1, name: "HTML, CSS" },
    { id: 2, name: "JavaScript" },
    { id: 3, name: "NodeJS" },
  ];

  const ul2 = React.createElement(
    "ul",
    { className: "courses-list" },
    courses.map((item) =>
      React.createElement(
        "li",
        { className: "course-item", key: item.id },
        React.createElement("a", { href: `/courses/${item.id}` }, item.name)
      )
    )
  );

  return (
    <Tabs>
      <Tab title="Tab 1">Content of Tab 1</Tab>
      <Tab title="Tab 1">Content of Tab 1</Tab>
      <Tab title="Tab 1">Content of Tab 1</Tab>
      <Tab title="Tab 1">Content of Tab 1</Tab>
      <Tab title="Tab 1">Content of Tab 1</Tab>
    </Tabs>
  );
}

export default PartTimeJobs;
