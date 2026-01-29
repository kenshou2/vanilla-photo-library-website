## Photo library website
### [Live Demo](https://kenshou2.github.io/vanilla-photo-library-website/)

<img width="343" height="188" alt="img4" src="https://github.com/user-attachments/assets/f49db46f-6602-4376-bb4e-f7c0a3f2aaa9" />
<img width="343" height="188" alt="img5" src="https://github.com/user-attachments/assets/29f5daa5-1767-44c3-96e0-4b0951b56b04" />
<img width="343" height="188" alt="img6" src="https://github.com/user-attachments/assets/3e05a9a3-ad11-4be5-a2bc-98b6713dc64b" />
<img width="343" height="188" alt="img7" src="https://github.com/user-attachments/assets/98d45b7c-1ea6-48d4-9685-402779f8dc63" />

A photo library web application built with **vanilla HTML, CSS, and TypeScript**, using **lit-html** for declarative templating.  
The goal of this project was to explore **component-based architecture and SPA-style routing** using base web technologies — without relying on frontend frameworks.
> Disclaimer: This is a demo project. All images are sourced from Unsplash and Pexels and are used in accordance with their respective licenses.

## Technologies
- HTML
- CSS
- TypeScript
- lit-html
  
## Features
- Complex UI interactions with animations and transitions
- Non-trivial, magazine-style layout composition
- Photo search and filtering
- Custom dynamic, SPA-style routing

> Note: Responsiveness was intentionally deprioritized in this project to focus on architecture, routing, and UI behavior. Responsive layouts were explored extensively in other projects.

## Architecture Overview

The project follows a **component-based approach inspired by modern frameworks** such as React and Angular, implemented using the **Web Components API** and **Shadow DOM** for style encapsulation.

### Core Structure
- **components** — reusable UI elements shared across the application
- **data** — static configuration and data definitions
- **modules** — page-level UI composition and routing targets

This structure enforces separation of concerns and keeps the codebase modular and maintainable.

## What I Learned
- Building framework-like abstractions using native web APIs
- Designing complex UI layouts and interactions without external libraries
- Implementing a custom SPA router
- Structuring maintainable frontend applications with vanilla technologies

## Future Improvements
- Improve accessibility across the application
- Optimize assets using responsive image-loading strategies
- Add full responsive layout support
