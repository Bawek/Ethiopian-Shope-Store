// utils/shopSetup.js
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const shopTemplates = require('./shopTemplates');

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const stat = promisify(fs.stat);
const unlink = promisify(fs.unlink);
const rmdir = promisify(fs.rmdir);
const rm = promisify(fs.rm);

class ShopSetup {
  constructor(domain) {
    this.domain = domain;
    this.sanitizedDomain = this.sanitizeDomain(domain);
    this.basePath = path.join(
      __dirname, // backend/utils
      '..',      // backend
      '..',      // project root
      'frontend',
      'app',
      this.sanitizedDomain
    ); this.createdPaths = [];
  }

  sanitizeDomain(domain) {
    if (!domain || typeof domain !== 'string') {
      throw new Error('Invalid domain provided');
    }
    return domain

      .toLowerCase()
      .replace(/[\/\\:*?"<>|]/g, '-')  // replace forbidden Windows filename characters

  }

  async createPath(filePath, content = '') {
    try {
      const dir = path.dirname(filePath);
      // Create directory if it doesn't exist
      await mkdir(dir, { recursive: true });
      if (!this.createdPaths.includes(dir)) {
        this.createdPaths.push(dir);
      }

      // Create file if content is provided
      if (content) {
        await writeFile(filePath, content, 'utf8');
        this.createdPaths.push(filePath);
      }

      return true;
    } catch (error) {
      console.error(`Failed to create path: ${filePath}`, error);
      throw error;
    }
  }

  async rollback() {
    // Delete in reverse order (files first, then directories)
    for (const path of [...this.createdPaths].reverse()) {
      try {
        const stats = await stat(path);
        if (stats.isFile()) {
          await unlink(path);
        } else {
          // Node 14+ supports recursive rm
          if (fs.rm) {
            await rm(path, { recursive: true, force: true });
          } else {
            // Fallback for older Node versions
            const files = await readdir(path);
            await Promise.all(files.map(file =>
              unlink(path.join(path, file))
            ));
            await rmdir(path);
          }
        }
      } catch (error) {
        console.error(`Rollback failed for ${path}:`, error);
      }
    }
  }

  async generateStructure() {
    const structure = [
      // Root files
      { path: 'layout.js', content: shopTemplates.layout(this.domain) },
      { path: 'loading.js', content: shopTemplates.loading() },
      { path: 'error.js', content: shopTemplates.error(this.domain) },
      { path: 'page.js', content: shopTemplates.page(this.domain) },
      { path: 'not-found.js', content: shopTemplates.notFound(this.domain) },
      // Standard subpages
      { path: 'about/page.js', content: shopTemplates.subpage(this.domain, 'about') },
      { path: 'contact/page.js', content: shopTemplates.subpage(this.domain, 'contact') },

      // Product routes
      { path: 'products/page.js', content: shopTemplates.subpage(this.domain, 'products') },
      { path: 'products/[id]/page.js', content: shopTemplates.dynamicRoute(this.domain, 'product') },

      // Blog routes
      { path: 'blog/page.js', content: shopTemplates.subpage(this.domain, 'blog') },
      { path: 'blog/[slug]/page.js', content: shopTemplates.dynamicRoute(this.domain, 'post') },
    ];

    // Create all paths
    await Promise.all(
      structure.map(async ({ path: filePath, content }) => {
        const fullPath = path.join(this.basePath, filePath);
        await this.createPath(fullPath, content);
      })
    );
  }

  async execute() {
    try {
      await this.generateStructure();
      return {
        success: true,
        domain: this.domain,
        sanitizedDomain: this.sanitizedDomain,
        path: this.basePath,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      await this.rollback();
      throw error;
    }
  }
}

module.exports = ShopSetup;