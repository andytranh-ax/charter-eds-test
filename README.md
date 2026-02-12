# Charter EDS Test

A demo Adobe Edge Delivery Services (EDS) site that rebuilds a Charter/Spectrum-style page using the open-source AEM boilerplate.

## Prerequisites

Before you start, install the following on your computer:

### 1. Node.js

Node.js is the engine that runs the local EDS development server.

- Go to [https://nodejs.org](https://nodejs.org)
- Download the **LTS version** (the one that says "Recommended for most users")
- Run the installer, click Next through everything, accept defaults
- Verify it worked — open your Terminal (Mac) or Command Prompt (Windows) and run:
  ```bash
  node --version
  ```
  You should see a version number like `v20.x.x`

### 2. Git

Git is how you manage and push your code.

- **Mac**: You probably already have it. Type `git --version` in Terminal. If it prompts you to install developer tools, say yes.
- **Windows**: Go to [https://git-scm.com/download/win](https://git-scm.com/download/win), download, and install with defaults.

### 3. A GitHub Account (free)

- Go to [https://github.com](https://github.com) and sign up if you don't have one
- This is where your EDS project code lives

### 4. A Code Editor

We recommend **Visual Studio Code**:
- Download from [https://code.visualstudio.com](https://code.visualstudio.com)
- Free, works on Mac and Windows

---

## Step-by-Step Setup

### Step 1: Create Your Project from Adobe's Boilerplate

1. Go to [https://github.com/adobe/aem-boilerplate](https://github.com/adobe/aem-boilerplate)
2. Click the green **"Use this template"** button near the top right
3. Click **"Create a new repository"**
4. Name it something like `charter-eds-test`
5. Make sure it's set to **Public**
6. Click **"Create repository"**

You now have your own copy of Adobe's starter EDS project.

### Step 2: Install the AEM Code Sync GitHub App

1. Go to [https://github.com/apps/aem-code-sync](https://github.com/apps/aem-code-sync)
2. Click **"Install"**
3. Select your GitHub account
4. Choose **"Only select repositories"** and pick your `charter-eds-test` repo
5. Click **Install**

This connects your GitHub repo to Adobe's EDS infrastructure. It's what makes your code go live automatically.

### Step 3: Clone It to Your Computer

Open Terminal (Mac) or Command Prompt (Windows) and run:

```bash
cd Desktop
git clone https://github.com/YOUR-GITHUB-USERNAME/charter-eds-test.git
cd charter-eds-test
```

Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username.

### Step 4: Install the AEM CLI and Start the Local Server

In the same Terminal window:

```bash
npm install -g @adobe/aem-cli
aem up
```

Your browser should open automatically to [http://localhost:3000](http://localhost:3000). You'll see a basic page — that's your EDS site running locally.

### Step 5: Set Up a Content Source

You need somewhere to author content. The easiest option is Google Drive:

1. Create a new folder in your Google Drive called `charter-eds-test`
2. Share that folder with `helix@adobe.com` (give **Editor** access)
3. In your code project, open the file called `fstab.yaml`
4. Replace the URL with the link to your Google Drive folder
5. Save the file

Now anything you create in that Google Drive folder becomes a page on your EDS site.

### Step 6: Create Your First Test Page

1. In your Google Drive folder, create a new **Google Doc**
2. Name it `test-page`
3. Add some content — a heading, a paragraph, an image
4. Use the **AEM Sidekick** browser extension to preview and publish (install from Chrome Web Store: search "AEM Sidekick")

Your page will be live at:
```
https://main--charter-eds-test--YOUR-USERNAME.aem.page/test-page
```

---

## Charter-Style Hero Block

This project includes a pre-built `hero` block styled to match Charter/Spectrum marketing pages.

### How It Works

The hero block renders a full-width background image with a text overlay and a call-to-action button using Spectrum-style blue (`#0051BF`).

### Authoring the Hero Block in Google Docs

In your Google Doc, create a table with one column. The first row should say `hero`. Then add rows for your content:

| hero |
|------|
| *(paste a background image here)* |
| **Get the fastest internet** |
| Stream, game, and work with speeds up to 1 Gbps. |
| [Shop plans](https://spectrum.net) |

### Push Your Code Changes

```bash
git add .
git commit -m "Add Charter-style hero block"
git push
```

Your block is now live on your EDS preview URL.

---

## Project Structure

```
charter-eds-test/
├── blocks/
│   └── hero/
│       ├── hero.js          # Hero block JavaScript (decoration logic)
│       └── hero.css          # Hero block CSS (Charter/Spectrum styling)
├── scripts/
│   ├── aem.js               # Core AEM/EDS library utilities
│   ├── scripts.js            # Project scripts (loading, decoration)
│   └── delayed.js            # Lazy-loaded scripts (analytics, etc.)
├── styles/
│   ├── styles.css            # Global styles (Charter color scheme)
│   ├── lazy-styles.css       # Lazy-loaded styles
│   └── fonts.css             # Custom font loading
├── tools/
│   └── sidekick/
│       └── config.json       # AEM Sidekick configuration
├── head.html                 # Injected into <head> on every page
├── fstab.yaml                # Content source mount configuration
├── 404.html                  # Custom 404 page
└── README.md                 # This file
```

## License

Apache License 2.0
