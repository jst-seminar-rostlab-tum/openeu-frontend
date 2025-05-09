# ProjectEurope - OpenEU - FrontEnd

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-16-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Local development

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Node.js Version

This project requires the LTS **Node.js v22.15.0**. Please ensure you are using the correct version.

We recommend using a version manager like [`nvm`](https://github.com/nvm-sh/nvm) to manage your Node.js versions. To install and use the required version:

```bash
nvm install 22.15.0
nvm use 22.15.0
```

You can verify your Node.js version with:

```bash
node --version
```

**Make sure to use yarn instead of npm!**
To install `yarn`, follow [this guide](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable).

### Install dependencies

```bash
yarn install
```

### Set up `.env` file

Create a file called `.env` in the root of the project and populate it with the following values:

```
for now, ignore this part
```

### Run the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Lint your code

To check if there are any lint errors, run

```bash
yarn lint
```

To fix any lint errors, run

```bash
yarn lint:fix
```

## Deployment

n/a

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Development guidelines

Besides the usual guidlines, we're following these as per the customer's request:

### Styling

Linting and styling is based on [Airbnb's React style guide](https://airbnb.io/javascript/react/). A pre-commit hook will make sure that only well-formatted code is commited to the repo, but a GitHub Actions workflow will also check this on each PR.

### Code Best Practices

To maintain a clean and consistent codebase, follow these best practices:

1. **Component Structure**:

   - Each React component should be defined in its own file.
   - Use the `PascalCase` naming convention for component files (e.g., `MyComponent.tsx`).
   - Keep related styles, tests, and utilities in the same folder as the component (e.g., `MyComponent/MyComponent.tsx`, `MyComponent/MyComponent.test.tsx`, `MyComponent/MyComponent.module.css`).

2. **Reusable Components**:

   - Avoid duplicating code. Extract reusable logic into shared components or utility functions.

3. **TypeScript**:

   - Always use TypeScript for type safety.
   - Define `Props` and `State` interfaces/types for components.

4. **Folder Structure**:

   - Follow a modular folder structure to keep the project organized. For example:
     ```
     src/
       app/
       components/
       config/
       domain/
       infrastructure/
       operations/
       utils/
       styles/
     ```

5. **Code Comments**:

   - Add comments to explain complex logic, but avoid over-commenting obvious code.

6. **Error Handling**:

   - Always handle errors gracefully, especially in API calls or asynchronous operations.

7. **Testing**:
   - Write unit tests for all components and utility functions.
   - Use integration tests for critical workflows.

### Git and GitHub

Always work on a separate branch, never commit to main! When you're creating a branch, you should use the branchname provided by Github (you can create branch right from the ticket which you was assigned to and add `feature/` as prefix). It should have the following format: `feature/<issue no.>-fe-<concise description of issue>`.

Commit messages are also linted using husky and commitlint, so make sure to start each commit message with `feat:`, `fix:` or `docs:` depending on the type of work implemented in that commit.

After you're done with your task, create a Pull Request and share it with your teammates, ask your team lead and/or TPL for a review. Use squash merge when the PR is approved.

### Project Structure

Each component should have their own file, where the file name is the name of the component. The app directory is for pages and layouts, all other components should go to the components directory. Try to group components to sub-directories based on their function. Code that doesn't belong to a specific component should be placed in a different file, in directories like utils, config, types, etc.

### Domain Driven Design

DDD is a software design approach that is against the idea of having a single unified model; instead it divides a large system into bounded contexts, each of which have their own model.

What this means for a React application, is that instead of using one global state with, for example Redux, we will have a React context for each of our entities that will store all the data and offer all the methods related to that domain.

- The domain folder contains all the entities and repositories. (Types, Interfaces, etc.)
- The infrastructure folder contains the implementations of the interfaces. (API calls, etc.)
- The operations folder contains the business logic that is not related to a specific entity.
- Bigger files and functions should be placed in the operations folder

### Dependency Injection

The point of DI is that the dependencies of services should not be hardcoded, instead they should receive them as parameters, where the type of the parameter is an interface. This makes testing easier and the code more reusable, since the same service can be used with different implementations of the same interface (for example mock implementations for testing).

- Example of how to use the container to resolve a dependency can be found in `src/app/elements/page.tsx`.
- A list of all dependencies and their implementations can be found in `src/container.tsx`.

### Accessibility score

#### Form elements must have labels

Programmatically associate labels with all form controls. The recommended method for most circumstances is to use the label element and an explicit association using the for and id attributes. The examples here are ordered from the most common acceptable solution to the least common acceptable solution. For more information, please check: https://dequeuniversity.com/rules/axe/4.9/label

#### list HTML structure

Ensure all ordered and unordered lists (defined by ul or ol elements) contain only li content elements.

For more information, please check: https://dequeuniversity.com/rules/axe/4.9/list

#### Color contrast

Ensure all text elements have sufficient color contrast between the text in the foreground and background color behind it.

Success Criterion: Ensure color contrast of at least 4.5:1 for small text or 3:1 for large text, even if text is part of an image. Large text has been defined in the requirements as 18pt (24 CSS pixels) or 14pt bold (19 CSS pixels). Note: Elements found to have a 1:1 ratio are considered "incomplete" and require a manual review.

For more information, please check: https://dequeuniversity.com/rules/axe/4.9/color-contrast

#### Aira-label

For more information, please check: https://dequeuniversity.com/rules/axe/4.9/aria-command-name

#### Target size

For more information, please check:https://dequeuniversity.com/rules/axe/4.9/target-size
