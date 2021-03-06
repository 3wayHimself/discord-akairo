const Messages = {
    // Module-related
    FILE_NOT_FOUND: filename => `File '${filename}' not found`,
    MODULE_NOT_FOUND: (constructor, id) => `${constructor} '${id}' does not exist`,
    ALREADY_LOADED: (constructor, id) => `${constructor} '${id}' is already loaded`,
    NOT_RELOADABLE: (constructor, id) => `${constructor} '${id}' is not reloadable`,
    INVALID_CLASS_TO_HANDLE: (given, expected) => `Class to handle ${given} is not a subclass of ${expected}`,

    // Command-related
    ALIAS_CONFLICT: (alias, id, conflict) => `Alias '${alias}' of '${id}' already exists on '${conflict}'`,

    // Generic errors
    NOT_IMPLEMENTED: (constructor, method) => `${constructor}#${method} has not been implemented`,
    INVALID_TYPE: (name, expected, vowel = false) => `Value of '${name}' was not ${vowel ? 'an' : 'a'} ${expected}`
};

/** @extends Error */
class AkairoError extends Error {
    /**
     * Creates an error for Akairo
     * @param {string} key - Error key.
     * @param {...any} args - Arguments.
     */
    constructor(key, ...args) {
        if (Messages[key] == null) throw new TypeError(`Error key '${key}' does not exist`);
        const message = typeof Messages[key] === 'function'
            ? Messages[key](...args)
            : Messages[key];

        super(message);
        this.code = key;
    }

    get name() {
        return `AkairoError [${this.code}]`;
    }
}

module.exports = AkairoError;
