const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const generated = path.join(root, '.generated');
const pages = path.join(root, 'src', 'pages');
const publicDir = path.join(root, 'public');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    entry.isDirectory() ? copyDir(from, to) : fs.copyFileSync(from, to);
  }
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    entry.isDirectory() ? out.push(...walk(full)) : out.push(full);
  }
  return out;
}

function endpointPath(relativeHtml) {
  const directory = path.dirname(relativeHtml);
  const filename = path.basename(relativeHtml);
  const endpointName = `${filename}.ts`;
  return directory === '.'
    ? path.join(pages, endpointName)
    : path.join(pages, directory, endpointName);
}

if (!fs.existsSync(generated)) {
  throw new Error('Missing .generated output. Run generate-static.cjs first.');
}

fs.rmSync(pages, { recursive: true, force: true });
fs.rmSync(publicDir, { recursive: true, force: true });
fs.mkdirSync(pages, { recursive: true });
fs.mkdirSync(publicDir, { recursive: true });

let pageCount = 0;
for (const file of walk(generated)) {
  const relative = path.relative(generated, file);
  const normalized = relative.split(path.sep).join('/');

  if (file.endsWith('.html') && !normalized.startsWith('admin/')) {
    const output = endpointPath(relative);
    const html = fs.readFileSync(file, 'utf8');
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(
      output,
      `// Generated Astro endpoint. It returns the approved HTML without allowing Vite to parse inline tracking scripts.\n` +
      `export const prerender = true;\n` +
      `const html = ${JSON.stringify(html)};\n` +
      `export function GET() {\n` +
      `  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });\n` +
      `}\n`
    );
    pageCount++;
  }
}

copyDir(path.join(root, 'assets'), path.join(publicDir, 'assets'));
copyDir(path.join(root, 'admin'), path.join(publicDir, 'admin'));
for (const name of ['robots.txt', 'sitemap.xml', '_redirects']) {
  const source = path.join(generated, name);
  if (fs.existsSync(source)) fs.copyFileSync(source, path.join(publicDir, name));
}
fs.writeFileSync(path.join(publicDir, '.nojekyll'), '');

console.log(`Prepared ${pageCount} Astro endpoint routes with unchanged HTML.`);
