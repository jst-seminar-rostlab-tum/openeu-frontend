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
NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
GOOGLE_CLIENT_ID="YOUR_CLIENT"
GOOGLE_CLIENT_SECRET="YOUR_SECRET"
GOOGLE_REDIRECT_URI="YOUR_CALLBACK"
NEXT_PUBLIC_API_URL="https://openeu-backend-1.onrender.com"
```

Get the API Key from Notion

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

Website is deployed at: https://openeu.csee.tech/

## Development guidelines

Besides the usual guidelines, we're following:

### Styling

Linting and styling is based on [Airbnb's React style guide](https://airbnb.io/javascript/react/). A pre-commit hook will make sure that only well-formatted code is commited to the repo, but a GitHub Actions workflow will also check this on each PR.

### Code Best Practices

To maintain a clean and consistent codebase, follow these best practices:

1. **Reusable Components**:

   - Avoid duplicating code. Extract reusable logic into shared components or utility functions.

2. **TypeScript**:

   - Always use TypeScript for type safety.
   - Define `Props` and `State` interfaces/types for components.

3. **Folder Structure**:

   - Follow a modular folder structure to keep the project organized. For example:
     ```
     src/
       app/
       components/
       config/
       domain/
       lib/
       operations/
       repositories/
       styles/
       utils/
     ```

4. **Code Comments**:

   - Add comments to explain complex logic, but avoid over-commenting obvious code.

5. **Error Handling**:

   - Always handle errors gracefully, especially in API calls or asynchronous operations.

### Git and GitHub

🚨 **Direct commits to `main` are strictly prohibited!**

Always work on a separate branch.

When you're creating a branch, you should use the branchname provided by Github (you can create branch right from the ticket which you was assigned to and add `feature/` as prefix). It should have the following format: `feature/<issue no.>-fe-<concise description of issue>`.

Other branch type:

- **`bugfix`**: For fixing bugs or issues.
- **`hotfix`**: For urgent fixes that need to be applied directly to production.
- **`feature`**: For feature development, usually taken from predefined backlog items.

#### Common Commit Message Types

- **`feat`**: A new feature.
- **`fix`**: A bug fix.
- **`docs`**: Documentation changes.
- **`style`**: Code style changes (e.g., formatting, missing semicolons).
- **`refactor`**: Code refactoring without changing functionality.
- **`test`**: Adding or updating tests.
- **`chore`**: Maintenance tasks (e.g., dependency updates).

Make sure your commit messages follow this format:

```plaintext
<type>: <short description>
```

#### Example:

```plaintext
feat: add user authentication flow
```

After you're done with your task, create a Pull Request and share it with your teammates, ask your team lead and TPL for a review. Use squash merge when the PR is approved.

### Project Structure

Each component should have their own file, where the file name is the name of the component. The app directory is for pages and layouts, all other components should go to the components directory. Try to group components to sub-directories based on their function. Code that doesn't belong to a specific component should be placed in a different file, in directories like utils, config, types, etc.
