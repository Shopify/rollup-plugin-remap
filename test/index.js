const assert = require('assert');
const {join} = require('path');
const remap = require('../index'); // eslint-ignore-this-line node/no-missing-require

suite('This will test rollup-plugin-remap', () => {
  test('it resolves relative paths', () => {
    const targetPath = './targetPath.js';
    const instance = remap({
      originalPath: './originalPath.js',
      targetPath
    });

    const importee = join(process.cwd(), 'originalPath.js');
    const importer = join(process.cwd(), 'someModule.js');

    assert.equal(instance.resolveId(importee, importer), join(process.cwd(), targetPath));
  });

  test('it resolves absolute paths', () => {
    const targetPath = join(process.cwd(), './targetPath.js');
    const originalPath = join(process.cwd(), './originalPath.js');
    const instance = remap({
      originalPath,
      targetPath
    });

    const importee = originalPath;
    const importer = join(process.cwd(), 'someModule.js');

    assert.equal(instance.resolveId(importee, importer), targetPath);
  });

  test('it remaps relative imports', () => {
    const targetPath = './targetPath.js';
    const instance = remap({
      originalPath: './originalPath.js',
      targetPath
    });

    const importee = '../originalPath.js';
    const importer = 'somePath/someModule.js';

    assert.equal(instance.resolveId(importee, importer), join(process.cwd(), targetPath));
  });

  test('it normalizes file extensions', () => {
    const targetPath = './targetPath.js';
    const instance = remap({
      originalPath: './originalPath.js',
      targetPath
    });

    const importee = join(process.cwd(), 'originalPath');
    const importer = join(process.cwd(), 'someModule');

    assert.equal(instance.resolveId(importee, importer), join(process.cwd(), targetPath));
  });
});
