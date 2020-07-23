import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Content from "../app/components/content";
import Gallery from "../app/components/gallery";

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


// How to test Gallery?
describe('Gallery tests', () => {
    it('render test', () => {
        let test = language => {
            act(() => {
                render(<Gallery language={language} />, container);
            });

            expect(
                container.querySelector('[id="gallery-title"]').textContent
            ).toBe(Content.gallery.title[language]);
        }

        test(Content.Languages.EN);
        test(Content.Languages.RU);
    })
});