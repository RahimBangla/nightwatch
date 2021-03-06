const BaseCommandLoader = require('./_base-loader.js');
const ElementCommand = require('../element/command.js');

class ElementCommandLoader extends BaseCommandLoader {
  static createInstance(CommandModule, opts) {
    let ClassName = CommandModule || ElementCommand;

    return new ClassName(opts);
  }

  createWrapper() {
    this.commandFn = function commandFn(...args) {
      const instance = ElementCommandLoader.createInstance(this.module, {
        args,
        commandName: this.commandName,
        nightwatchInstance: this.nightwatchInstance
      });

      instance.stackTrace = commandFn.stackTrace;

      return instance.execute();
    };

    return this;
  }
}

module.exports = ElementCommandLoader;
