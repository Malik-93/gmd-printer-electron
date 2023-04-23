module.exports = {
  packagerConfig: {
    "protocols": [
      {
        "name": "Electron Fiddle",
        "schemes": ["gmd-electron-fiddle"]
      }
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        "mimeType": ["x-scheme-handler/gmd-electron-fiddle"]
      },
    },
    {
      name: '@electron-forge/maker-zip',
      config: {}
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
