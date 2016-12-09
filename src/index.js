/* eslint-env node */

import {addExtension} from 'rollup-pluginutils';
import {isAbsolute, dirname, join} from 'path';

const projectRoot = process.cwd();

function normalizePath(pathToNormalize) {
  if (isAbsolute(pathToNormalize)) {
    return addExtension(pathToNormalize);
  }

  return join(projectRoot, addExtension(pathToNormalize));
}

export default function remap(options = {}) {
  const fullOriginalPath = normalizePath(options.originalPath);
  const fullTargetPath = normalizePath(options.targetPath);

  return {
    name: 'remap',

    resolveId(importee, importer) {
      if (!importer) {
        return null;
      }

      let fullImportPath;

      if (isAbsolute(importee)) {
        fullImportPath = addExtension(importee);
      } else {
        fullImportPath = join(dirname(normalizePath(importer)), addExtension(importee));
      }

      if (fullImportPath === fullOriginalPath) {
        return fullTargetPath;
      }

      return null;
    }
  };
}
