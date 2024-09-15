#!/usr/bin/env node

/**
 * Setup script for SVG-Edit extensions in Node.js
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Variables
const SVG_EDIT_REPO = "https://github.com/SVG-Edit/svgedit.git";
const SVG_EDIT_DIR = "svg-edit";
const EXTENSIONS_DIR = "extensions";

// Function to execute shell commands synchronously
function runCommand(command, options = {}) {
  console.log(`Running: ${command}`);
  try {
    execSync(command, { stdio: "inherit", ...options });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    process.exit(1);
  }
}

// Clone or update SVG-Edit repository
if (!fs.existsSync(SVG_EDIT_DIR)) {
  console.log("Cloning SVG-Edit repository...");
  runCommand(`git clone ${SVG_EDIT_REPO} ${SVG_EDIT_DIR}`);
} else {
  console.log("SVG-Edit repository already exists. Pulling latest changes...");
  runCommand("git pull", { cwd: SVG_EDIT_DIR });
}

// Link extensions
console.log("Linking extensions...");

const extensions = fs.readdirSync(EXTENSIONS_DIR);

extensions.forEach((extensionName) => {
  const extensionPath = path.join(EXTENSIONS_DIR, extensionName);
  const stats = fs.lstatSync(extensionPath);
  if (stats.isDirectory()) {
    const svgEditExtensionPath = path.join(
      SVG_EDIT_DIR,
      "src",
      "editor",
      "extensions",
      extensionName
    );

    // Remove existing symlink or directory
    if (fs.existsSync(svgEditExtensionPath)) {
      fs.rmSync(svgEditExtensionPath, { recursive: true, force: true });
    }

    console.log(`Copying ${extensionName}...`);
    copyRecursiveSync(extensionPath, svgEditExtensionPath);

    console.log(`Copying ${extensionName} extension...`);
    copyRecursiveSync(extensionPath, svgEditExtensionPath);

    // Copy images from the extension to svg-edit's images directory
    const extensionImagesPath = path.join(extensionPath, "images");
    const svgEditImagesPath = path.join(
      SVG_EDIT_DIR,
      "src",
      "editor",
      "images"
    );
    const svgEditImagesExtensionPath = path.join(
      svgEditImagesPath,
      extensionName
    );

    if (fs.existsSync(extensionImagesPath)) {
      console.log(
        `Copying images from ${extensionName} to svg-edit images directory...`
      );

      // Copy images to svg-edit images directory under a subdirectory named after the extension
      copyRecursiveSync(extensionImagesPath, svgEditImagesExtensionPath);
    }
  }
});

// run npm install && build
runCommand("npm install", { cwd: SVG_EDIT_DIR });
runCommand("npm run build", { cwd: SVG_EDIT_DIR });

console.log("Setup complete.");

/**
 * Recursively copies files and directories from src to dest
 * @param {string} src - Source path
 * @param {string} dest - Destination path
 */
function copyRecursiveSync(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}
