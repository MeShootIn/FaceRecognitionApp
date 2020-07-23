import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Content from "../app/components/content";
import Footer from "../app/components/footer";

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

describe('Footer tests', () => {
    it('render test', () => {
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

        test(Content.Languages.EN);
        test(Content.Languages.RU);
        
        expect(
            container.querySelector('[id="copyright"]').textContent
        ).toContain(Content.company.years + ' - ' + Content.company.name);
        expect(
            container.querySelector('[id="copyright"]').getAttribute("href")
        ).toEqual(Content.company.website);
    })
});