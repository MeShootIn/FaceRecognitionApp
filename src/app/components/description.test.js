import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Content from "./content";
import Description from "./description";

// test isolation
let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});
// ===============

describe('Description tests', () => {
    it('render test', () => {
        let test = language => {
            act(() => {
                render(<Description language={language} />, container);
            });
            expect(container.textContent).toBe(Content.description[language]);
        }

        test(Content.Languages.EN);
        test(Content.Languages.RU);
    })
});