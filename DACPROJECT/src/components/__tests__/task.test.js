import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { HashRouter } from "react-router-dom";

import Task from "../task";

describe("On Mount", () => {
  let wrapper;

  const alert = () => {
    console.log("Alert");
  };

  const item = {
    item: alert,
    assignedTo: "Ivan",
    description: "<p>asdf</p>",
    id: 2,
    project: "Demo",
    status: "In Progress",
    taskID: 1,
    taskId: 1,
    title: "F1.2",
    type: "finding",
    project: "Demo",
  };

  it("Renders component", async () => {
    await act(async () => {
      wrapper = await mount(
        <main>
          <HashRouter forceRefresh={true}>
            <Task item={item} />
          </HashRouter>
        </main>
      );
    });
    wrapper.update();
    expect(wrapper).toHaveLength(1);
  });
});
