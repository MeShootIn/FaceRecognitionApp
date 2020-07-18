import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Content from "./content";
import Instruction from "./instruction";

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

it("Instruction test", () => {
    let test = language => {
        act(() => {
            render(<Instruction language={language} />, container);
        });
    
        expect(
            container.querySelector('[id="firstStep"]').textContent
        ).toBe('1. ' + Content.instruction.titles.first[language]);
        expect(
            container.querySelector('[id="firstDesc"]').textContent
        ).toBe(Content.instruction.descriptions.first[language]);
    
        expect(
            container.querySelector('[id="secondStep"]').textContent
        ).toBe('2. ' + Content.instruction.titles.second[language]);
        expect(
            container.querySelector('[id="secondDesc"]').textContent
        ).toBe(Content.instruction.descriptions.second[language]);
    
        expect(
            container.querySelector('[id="thirdStep"]').textContent
        ).toBe('3. ' + Content.instruction.titles.third[language]);
        expect(
            container.querySelector('[id="thirdDesc"]').textContent
        ).toBe(Content.instruction.descriptions.third[language]);
    }

    for (let lang of Content.Languages) { test(lang); }
});