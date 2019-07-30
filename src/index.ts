import {PluginValidator as PluginValidatorMac} from "@sakuli/plugin-validator-darwin";
import {PluginValidator as PluginValidatorLinux} from "@sakuli/plugin-validator-linux";
import {PluginValidator as PluginValidatorWin} from "@sakuli/plugin-validator-win32";

const exportedPackage = (process.platform === "win32") ? PluginValidatorWin : (process.platform === "linux") ? PluginValidatorLinux : PluginValidatorMac;

export {exportedPackage};
