/* eslint no-multi-spaces:0 */

'use strict';

var Forge = {

  /**
   * Responsible for generating a custom DOM element. The purpose is to allow the usage of a
   * JSON object to build a DOM Element representation.
   * @param  {Object}     options - The options to be applied to the new dom element
   * @return {DOMElement} The generated dom element
   */
  build: (options) => {
    var node = document.createElement(options.dom);
    if (options.accept)         node.setAttribute('accept', options.accept);
    if (options.action)         node.setAttribute('action', options.action);
    if (options.alt)            node.setAttribute('alt', options.alt);
    if (options.autocapitalize) node.setAttribute('autocapitalize', options.autocapitalize);
    if (options.autocomplete)   node.setAttribute('autocomplete', options.autocomplete);
    if (options.autocorrect)    node.setAttribute('autocorrect', options.autocorrect);
    if (options.autofocus)      node.setAttribute('autofocus', true);
    if (options.checked)        node.setAttribute('checked', '');
    if (options.checkmark)      node.setAttribute('checkmark', options.checkmark);
    if (options.class)          node.setAttribute('class', options.class);
    if (options.colspan)        node.setAttribute('colspan', options.colspan);
    if (options.disabled)       node.setAttribute('disabled', '');
    if (options.for)            node.setAttribute('for', options.for);
    if (options.href)           node.setAttribute('href', options.href);
    if (options.id)             node.setAttribute('id', options.id);
    if (options.maxlength)      node.setAttribute('maxlength', options.maxlength);
    if (options.method)         node.setAttribute('method', options.method);
    if (options.multiple)       node.setAttribute('multiple', '');
    if (options.name)           node.setAttribute('name', options.name);
    if (options.onclick)        node.setAttribute('onclick', options.onclick);
    if (options.placeholder)    node.setAttribute('placeholder', options.placeholder);
    if (options.rel)            node.setAttribute('rel', options.rel);
    if (options.role)           node.setAttribute('role', options.role);
    if (options.selected)       node.setAttribute('selected', options.selected);
    if (options.spellcheck)     node.setAttribute('spellcheck', options.spellcheck);
    if (options.src)            node.setAttribute('src', options.src);
    if (options.style)          node.setAttribute('style', options.style);
    if (options.target)         node.setAttribute('target', options.target);
    if (options.title)          node.setAttribute('title', options.title);
    if (options.type)           node.setAttribute('type', options.type);
    if (options.url)            node.setAttribute('url', options.url);
    if (options.value)          node.setAttribute('value', options.value);
    if (options.text) {
      var textNode = document.createTextNode(options.text);
      node.appendChild(textNode);
    }

    // Grab all keys that start with 'data-' and adds them to the DOMElement
    var keys = Object.keys(options);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key.indexOf('data-') === 0) {
        node.setAttribute(key, options[key]);
      }
    }

    return node;
  },

  // NOTE: This doesn't work with tables dom elements!!
  compile: (source, variables) => {
    var keys = Object.keys(variables);
    keys.forEach((key) => {
      while (source.indexOf(`{{${key}}}`) !== -1) {
        source = source.replace(`{{${key}}}`, variables[key]);
      }
    });

    let frag = document.createRange().createContextualFragment(source);
    return frag.firstChild;
  }
};

export default Forge;
