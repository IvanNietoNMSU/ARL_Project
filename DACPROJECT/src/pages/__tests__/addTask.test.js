import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { HashRouter } from "react-router-dom";

import AddTask from "../addTask";

describe("On Mount", () => {
  let wrapper;

  const props = {
    title: "Test",
    desc: "Test",
    pk: 1,
    taskID: 1,
    AddFindingProps: "Test",
  };

  it("Renders component", async () => {
    await act(async () => {
      wrapper = await mount(
        <main>
          <HashRouter forceRefresh={true}>
            <AddTask location={{ ...props }} />
          </HashRouter>
        </main>
      );
    });
    wrapper.update();
    expect(wrapper).toHaveLength(1);
  });
});
