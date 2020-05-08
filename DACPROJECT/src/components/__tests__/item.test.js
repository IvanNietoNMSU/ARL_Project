import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { HashRouter } from "react-router-dom";

import Items from "../item";

describe("On Mount", () => {
  let wrapper;

  const alert = () => {
    console.log("Alert");
  };

  const props = {
    alert,
    name: "Test",
    target: "all",
  };

  it("Renders component", async () => {
    await act(async () => {
      wrapper = await mount(
        <main>
          <HashRouter forceRefresh={true}>
            <Items name={props} />
          </HashRouter>
        </main>
      );
    });
    wrapper.update();
    expect(wrapper).toHaveLength(1);
  });
});
