module.exports = {
    packagerConfig: {
      asar: true,
      icon: './src/assets/icons/icon',
      name: 'ClaudeDesk',
      executableName: 'claudedesk',
      osxSign: {},
      osxNotarize: {
        tool: 'notarytool',
        appleId: process.env.APPLE_ID,
        appleIdPassword: process.env.APPLE_PASSWORD,
        teamId: process.env.APPLE_TEAM_ID
      }
    },
    rebuildConfig: {},
    makers: [
      {
        name: '@electron-forge/maker-squirrel',
        config: {
          iconUrl: 'https://icon-icons.com/downloadimage.php?id=264356&root=4241/ICO/512/&file=xrp_crypto_icon_264356.ico',
          setupIcon: './src/assets/icons/icon.ico'
        }
      },
      {
        name: '@electron-forge/maker-zip',
        platforms: ['darwin']
      },
      {
        name: '@electron-forge/maker-deb',
        config: {
          options: {
            icon: './src/assets/icons/icon.png'
          }
        }
      },
      {
        name: '@electron-forge/maker-rpm',
        config: {
          options: {
            icon: './src/assets/icons/icon.png'
          }
        }
      }
    ]
  };