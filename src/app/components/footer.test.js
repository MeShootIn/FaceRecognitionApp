import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Content from "./content";
import Footer from "./footer";

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

it("Footer test", () => {
    let test = language => {
        act(() => {
            render(<Footer language={language} />, container);
        });
        expect(
            container.querySelector('[id="share-title"]').textContent
        ).toBe(Content.footer.share[language]);
        expect(
            container.querySelector('[id="disclaimer"]').textContent
        ).toBe(Content.footer.disclaimer[language]);
    }

    for (let lang of Content.Languages) { test(lang); }

    expect(
        container.querySelector('[id="copyright"]').textContent
    ).toContain(Content.company.years + ' - ' + Content.company.name);
    expect(
        container.querySelector('[id="copyright"]').getAttribute("href")
    ).toEqual(Content.company.website);
});