# How to Render Your n8n Blog Post with Code Snippets

## ✅ What's Been Set Up

I've successfully configured your blog to support rich content with code blocks, tables, and numbered lists:

1. **Added Code Block Schema** - Created `studio/schemaTypes/codeBlock.ts` with support for:
   - Multiple programming languages (JavaScript, Python, Bash, etc.)
   - Optional filename display
   - Syntax highlighting

2. **Added Table Schema** - Created `studio/schemaTypes/table.ts` with support for:
   - Multiple rows and columns
   - Header cells
   - Responsive design

3. **Updated Block Content Schema** - Modified `studio/schemaTypes/blockContent.ts` to include:
   - Code blocks
   - Tables
   - Numbered lists (in addition to bullet lists)

4. **Enhanced PortableTextRenderer** - Updated `components/portable-text.tsx` with:
   - Syntax highlighting using `react-syntax-highlighter`
   - Line numbers for code blocks
   - Dark theme styling
   - Filename display
   - Responsive table rendering
   - Numbered list support

5. **Installed Dependencies** - Added `prismjs`, `react-syntax-highlighter`, and types

## 🚀 How to Create Your n8n Blog Post

### Step 1: Access Sanity Studio

The Sanity Studio should be running at `http://localhost:3333`. If not, run:

```bash
cd studio && pnpm dev
```

### Step 2: Create New Blog Post

1. Go to Sanity Studio
2. Click "Blog Post" in the left sidebar
3. Click "Create new document"
4. Fill in the basic information:
   - **Title**: "Tired of writing glue code? n8n gives developers an open-source automation platform"
   - **Slug**: `n8n-automation-platform-for-developers` (auto-generated)
   - **Published at**: Set to today's date
   - **Excerpt**: "Tired of writing glue code? n8n gives developers an open-source automation platform that integrates with your stack while keeping full control. Learn how to automate deployments, manage webhooks, and connect services like a pro."

### Step 3: Add Content with Code Blocks

In the "Body" field, you'll add content using the block editor. Here's how to structure your post:

#### Introduction (Normal Text)

Add a normal text block with your introduction paragraph.

#### Headings

Use H2 for main sections like "Why Developers Choose n8n" and "Advanced Features Devs Actually Use"

#### Code Blocks

For each code snippet, click the "+" button and select "Code Block":

**JavaScript Code Block:**

- Language: JavaScript
- Filename: `transform-api.js` (optional)
- Code:

```javascript
// Transform API responses before processing
return items.map((item) => ({
  ...item,
  timestamp: new Date(item.created_at).toISOString(),
}));
```

**Bash Code Block:**

- Language: Bash
- Filename: `trigger-workflow.sh` (optional)
- Code:

```bash
curl -X POST -H "X-N8N-API-KEY: your-key" \
https://your-n8n.io/workflow/webhook/abc123
```

#### Tables

For comparison tables or structured data, click the "+" button and select "Table":

**Example Table Structure:**

- Row 1: Header cells (check "Is Header" for each cell)
  - Cell 1: "Traditional Approach"
  - Cell 2: "n8n Approach"
- Row 2: Data cells
  - Cell 1: "API webhooks: Write Express servers"
  - Cell 2: "API webhooks: Drag-and-drop connectors"
- Row 3: Data cells
  - Cell 1: "Error handling: Manual try/catch blocks"
  - Cell 2: "Error handling: Visual retry flows"

#### Numbered Lists

For step-by-step instructions or ordered content:

1. Select text in the editor
2. Click the numbered list button (1. 2. 3.) in the toolbar
3. Or use the "/" command and select "Numbered list"

### Step 4: Complete Content Structure

Here's the recommended structure for your post:

1. **Introduction** (Normal text)
2. **Why Developers Choose n8n** (H2 heading)
   - Bullet points about benefits
3. **Advanced Features Devs Actually Use** (H2 heading)
   - **Code Nodes** (H3 heading)
   - JavaScript code block
   - **CLI & API Control** (H3 heading)
   - Bash code block
   - **Debugging** (H3 heading)
   - Normal text about debugging features
4. **Killer Use Cases for Dev Teams** (H2 heading)
   - **CI/CD Automation** (H3 heading)
   - Normal text describing the workflow
   - **Blockchain DevOps** (H3 heading)
   - Normal text describing use cases
   - **Database Sync** (H3 heading)
   - Normal text describing ETL process
5. **How It Compares to Custom Code** (H2 heading)
   - Comparison table or bullet points
6. **Pro Deployment Tips** (H2 heading)
   - **For Scale** (H3 heading)
   - **For Security** (H3 heading)
   - **Debugging** (H3 heading)

### Step 5: Publish

1. Click "Publish" to make the post live
2. The post will be available at `/blog/n8n-automation-platform-for-developers`

## 🎨 Content Features

Your blog now supports rich content with:

### Code Blocks

- **Syntax highlighting** for 25+ programming languages
- **Line numbers** for easy reference
- **Filename display** at the top of code blocks
- **Dark theme** that matches your site's design
- **Responsive design** that works on all devices

### Tables

- **Header cells** with distinct styling
- **Responsive design** with horizontal scrolling on mobile
- **Hover effects** for better user experience
- **Dark theme** that matches your site's design
- **Border styling** for clear cell separation

### Lists

- **Bullet lists** for unordered content
- **Numbered lists** for step-by-step instructions
- **Proper spacing** and indentation
- **Dark theme** styling

## 🔧 Customization Options

You can customize the code block appearance by modifying `components/portable-text.tsx`:

- Change the theme by importing different styles from `react-syntax-highlighter`
- Adjust colors, fonts, and spacing
- Add copy-to-clipboard functionality
- Customize line number styling

## 📝 Tips for Writing with Code Blocks

1. **Use descriptive filenames** - Helps readers understand the context
2. **Keep code snippets focused** - One concept per code block
3. **Add comments** - Explain what the code does
4. **Use appropriate languages** - Select the correct language for syntax highlighting
5. **Test your post** - Preview the post to ensure code blocks render correctly

## 🚀 Next Steps

1. Create your blog post in Sanity Studio
2. Add all the content with proper code blocks
3. Publish and test the rendering
4. Share your new blog post with code syntax highlighting!

The code blocks will render beautifully with syntax highlighting, line numbers, and a professional appearance that matches your site's design.
