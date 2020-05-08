import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { HashRouter } from "react-router-dom";

import AllNotes from "../allnotes";

describe("On Mount", () => {
  let wrapper;

  const props = {
    name: "Test",
    AllNotesProps: "Test",
  };

  it("Renders component", async () => {
    await act(async () => {
      wrapper = await mount(
        <main>
          <HashRouter forceRefresh={true}>
            <AllNotes name={{ ...props }} location={{ ...props }} />
          </HashRouter>
        </main>
      );
    });
    wrapper.update();
    expect(wrapper).toHaveLength(1);
  });
});
