<img src="https://cdn.discordapp.com/attachments/959986358473084988/960017463607701525/Sin_titulo-1.png" width="546" alt="Redrawn" /></a>
# Redrawn (OUTDATED ORIGINAL SOURCE. WE'LL SEE YOU OVER AT THE NEW GOWDPK FORK!)
Redrawn is a GoAnimate Server Emulator carrying on the torch of [VisualPlugin's GoAnimate Wrapper project](https://github.com/GoAnimate-Wrapper) after it's shutdown in 2020. This is based off Wrapper Offline in a goal of being better than Wrapper Offline...

## Running / Installation
To start Redrawn on Windows, open start_wrapper.bat. It'll automate just about everything for you and, well, start Redrawn. On your first run, you will likely need to right-click it and click "Run as Administrator". This allows it to properly install what it needs to run. After your initial run, you shouldn't need to do that again, you can start it as normal.

If you want to import videos and characters from the original Wrapper or any other clones of it, open its folder and drag the "_SAVED" folder into Redrawn's "wrapper" folder. If you have already made any videos or characters, this will not work. Please only import on a new install with no saved characters or videos, or take the "_SAVED" folder in Redrawn out before dragging the old one in. If you want to import character IDs from the original LVM, you can paste `&original_asset_id=[ID HERE]` at the end of the link for the matching character creator.

## Updates & Support
For support, the first thing you should do is read through faq.txt, it most likely has what you want to know. If you can't find what you need, you can join the [Discord server](https://discord.gg/TjYYmUErTe). Joining the server is recommended, as there is a whole community to help you out.

## Dependencies
This program relies on Flash, Node.js and http-server to work properly. SilentCMD is also used to suppress all the extra logging noise you'd only need for troubleshooting and development. These all have been included with the project (utilities folder) to ensure full offline operation and will be installed if missing. The "wrapper" folder and http-server have their own dependencies, but they are included as well.

## License
Most of this project is free/libre software[1] under the MIT license. You have the freedom to run, change, and share this as much as you want.
This includes:
  - Files in the "wrapper" folder
  - Batch files made for Wrapper: Offline
  - Node.js
  - http-server
  - SilentCMD
  - Chromium Web Store

ungoogled-chromium is under the BSD 3-Clause license, which grants similar rights, but has some differences from MIT. MediaInfo has a similar BSD 2-Clause license. 7zip's license is mostly LGPL, but some parts are under the BSD 3-clause License, and some parts have an unRAR restriction. Stylus is under the GNU GPLv3 license. These licenses can be found in each program's folder in utilities\sourcecode.

The source code for compiled programs are all stored in utilities\sourcecode, and you can modify these as you wish. Parts of Offline that run from their source code directly (such as batch scripts) are not included in that folder, for obvious reasons.

Flash Player (utilities folder) and GoAnimate's original assets (server folder) are proprietary and do not grant you these rights, but if they did, this project wouldn't need to exist. Requestly, an addon included in Redrawn's browser, is sadly proprietary software, but you're free to remove the Chromium profile and use a fresh one if this bothers you. Requestly is primarily included because of how popular it is with our community.

While completely unnecessary, if you decide to use your freedom to change the software, it would be greatly appreciated if you sent it to me so I can implement it into the main program! With credit down here of course :)

## Credits
**Please do not contact anyone on the list for support, use the Discord server.**

Redrawn:
|Name          | Contribution         |
| ------------ | -------------------- |
| MiiArtisan   | Co-project lead and logo |
| DazaSeal     | Co-project lead and frontend designer  |
| JosephAnimate2022 | Backend development and batch related stuff (Helped with Chromebook support) |
| BluePeacocks | Developer, frontend |
| IdiotKid     | Developer, backend (Helped with importing) |
| Sage         | Developer |
| davidstv     | Developer, contributed to importing |
| florrza      | Achieve person (Mostly backend / fixes) |
| Jerry2009    | Achieve person (Found most of important files for backend / frontend) |
| JC Video     | Developer, helped with TTS fixes |
| OwenTheGoAnimator/PIXBits2 | Developer? |
| SnowFLG64 | Developer, Batch and a bit of fullstack|
| Kia       | Developer, created a TTS voice and remastered the Redrawn EXE UI, much more |

Original Wrapper, Wrapper offline, and unaffiliated credits:
| Name         | Contribution         |
| ------------ | -------------------- |
| VisualPlugin | GoAnimate Wrapper    |
| xomdjl_      | Horrible developer, fucking pedophile and just a bad person in general (https://docs.google.com/document/d/1o6PTmJ3Us1r4dGjX05Gj9QFDI6HHq0hdxfitaPssMag/edit)|
| CLarramore   | Bug fixes            |
| PoleyMagik   | Asset Store Archive  |
| GoTest334 (PL)   | Current Project Lead                                   |
| Benson (D)       | Wrapper: Offline                                       |
| NathanSaturnBOI  | Logo                                                   |
| Blukas/GoTube (D)| Import idea, Mega Comedy World 2                       |
| VisualPlugin     | Text to speech voices                                  |
| creepyjokes2000  | Waveform fix, improved actions                         |
| JoshAnimate      | Headgear fix                                           |
| RegularSpark     | Fixing 1.2.3 to actually work, truncated themelist     |
| KrisAnimate      | Chromium parameter                                     |
| octanuary        | Traitor and overall retard                             |
| PoleyMagik       | Client Modifications                                   |
| Vyond              | Creators of the themes we love   |
| http-party         | Creators of http-server          |
| Stephan Brenner    | Creator of SilentCMD             |
| vocatus            | Some of TronScript's batch code  |
| ss64.com           | Incredible CMD info resource     |
| robvanderwoude.com | Also amazing CMD info resource   |

These are credits from Redrawn and W:O.

## Footnotes
[1] - See <https://www.gnu.org/philosophy/free-sw.html> for a better definition of free software.
## Notes:
this version of redrawn is the reason why we quitted in the first place. but we came back anyway. however it is recommended if you use the express version of redrawn because that version has the tts not loading on video edit bug patched up. this version however does not and it is advised if you don't use this version unless you are testing it.
