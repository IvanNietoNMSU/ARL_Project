import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { HashRouter } from "react-router-dom";

import User from "../user";

describe("On Mount", () => {
  let wrapper;

  it("Renders component", async () => {
    await act(async () => {
      wrapper = await mount(
        <main>
          <HashRouter forceRefresh={true}>
            <User />
          </HashRouter>
        </main>
      );
    });
    wrapper.update();
    expect(wrapper).toHaveLength(1);
  });
});
