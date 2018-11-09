import Logger from 'logger';
const {info, error} = Logger(true, this);

var Utility = {

  ALPHANUMERIC: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ALPHABETIC:   'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  NUMERIC:      '0123456789',
  REGEX:        {
    email:            /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
    phone:            /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
    unitNumber:       /^\d+$/,
    streetAddress:    /^\s*\S+(?:\s+\S+)*$/,
    postalCode:       /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    zipCode:          /^\d{5}([ -]\d{4})?$/,
    country:          /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
    city:             /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
    stateProvince:    /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
    alphanumeric:     /^[A-Za-z0-9]*$/,
    imageFormat:      /.(?:jpe?g|png|gif)$/,
    name:             /^([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/i,
    industry:         /^([a-z0-9/]+[,.]?[ ]?|[a-z0-9]+['-]?)+$/i,
    businessName:     /^([a-z0-9/]+[,.]?[ ]?|[a-z0-9]+['-]?)+$/i,
    alphanumericName: /^[A-Za-z0-9 ,.'"-_]*$/,
    url:              /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/,
    date:             /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
  },

  printAmount: (amount, currency) => {
    return new Intl.NumberFormat('en-CA', {
      style:           'currency',
      currencyDisplay: 'symbol',
      currency:        currency || 'CAD'
    }).format(amount);
  },

  /**
   * Returns a random string of specific characters and specific length.
   * @param  {Number} num - The number of random characters
   * @param  {String} set - The character set to use.
   * @return {String} The random string
   */
  randomString: (num, set) => {
    var result = '';
    for (var i = num; i > 0; --i) {
      result += set[Math.round(Math.random() * (set.length - 1))];
    }
    return result;
  },

  /**
   * Add a JS library to the dom.
   * @param {String}   url      - The url src destination
   * @param {Function} callback - The callback function
   */
  getJS: (url, callback) => {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = () => {
      callback(null, {});
    };
    script.onerror = (err) => {
      callback(err);
    };

    document.head.appendChild(script);
  },

  /**
   * Checks the File Mime type and returns true or false if it's supported by the application for file upload
   * @param  {String}  mimeType - The file.type string value
   * @return {Boolean} True or false if valid for upload
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
   */
  isValidMimeType: (mimeType) => {
    switch (mimeType) {
      case 'application/pdf':
      case 'application/msword':
      case 'application/rtf':
      case 'application/vnd.ms-word.document.macroEnabled.12':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/vnd.oasis.opendocument.spreadsheet':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'application/vnd.ms-excel':
      case 'image/bmp':
      case 'image/jpeg':
      case 'image/png':
      case 'image/svg+xml':
      case 'image/tiff':
      case 'text/plain':
      case 'text/csv':
        return true;
      default:
        return false;
    }
  },

  /**
   * Send an XMLHttpRequest to the server.
   * @param {String}   method   - GET, POST, PUT etc ...
   * @param {String}   uri      - The endpoint route
   * @param {JSON}     options  - Top level parameters mush be qs & body.
   * @param {Function} callback - The callback function
   */
  sendXHR: (method, uri, options, callback) => {
    if (options && options.qs) {
      var params = Object.keys(options.qs);
      uri += '?';
      params.forEach((param) => {
        uri += `${param}=${options.qs[param]}&`;
      });
      uri = uri.slice(0, -1);
    }

    var xhr = new XMLHttpRequest();
    xhr.open(method.toUpperCase(), uri);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.setRequestHeader('Accept', 'application/json;charset=UTF-8');

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 401) return window.location.replace(`${window.location.origin}?status=unauthorized`);
        callback(null, xhr.status, xhr.response);
      }
    };

    if (options && options.body) {
      info(`${method.toUpperCase()} ${uri} ${JSON.stringify(options.body)}`);
      xhr.send(JSON.stringify(options.body));
    } else {
      info(`${method.toUpperCase()} ${uri}`);
      xhr.send();
    }
  },

  /**
   * File upload functionality
   * @param  {Object}   uri     - Where you want to upload the file
   * @param  {Object}   params  - Options that are being attached to the file upload
   * @param  {Function} callback - The callback function when done
   * @return {undefined}
   */
  uploadFile: (uri, params, callback) => {
    info('Uploading a file ...');
    if (!callback || typeof callback !== 'function') {
      return error(new Error('Unable to upload file. Callback function does not exist'));
    }

    if (!params) {
      return callback(new Error('Missing file upload parameters'));
    }
    if (params.file === undefined) {
      return callback(new Error('Missing file object'));
    }

    var file = params.file;
    var progress = () => {};
    if (params.progress && typeof params.progress === 'function') {
      progress = params.progress;
    }

    var trackingID = params.trackingID;

    var qs = 'name=' + file.name + '&size=' + file.size;
    if (params.datasetID) qs += '&datasetID=' + params.datasetID;
    if (params.businessID) qs += '&businessID=' + params.businessID;
    if (params.category) qs += '&category=' + params.category;
    if (params.outlierID) qs += '&outlierID=' + params.outlierID;
    if (params.type) qs += '&type=' + params.type;

    uri = `${uri}?${qs}`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();

    xhr.onload = () => {
      info(`Uploaded file [${file.name}]`);
    };

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        info(`${xhr.status}: ${xhr.responseText}`);
        switch (xhr.status) {
          case 200:
            var jsonResponse = JSON.parse(xhr.responseText);
            callback(null, jsonResponse);
            break;
          case 400:
            error(xhr.responseText);
            error(file);
            callback(new Error('Error occured while uploading file'));
            break;
          case 500:
            error(xhr.responseText);
            error(file);
            callback(new Error('Error occured while uploading file'));
            break;
          default:
            error(new Error(`Unhandled status code [${xhr.status}]`));
        }
      } else {
        // do nothing
      }
    };

    xhr.upload.onprogress = (evt) => {
      info(evt);
      if (evt.lengthComputable) {
        var rounded = Math.round(((evt.loaded / evt.total) * 100) * 10) / 10;
        var percentComplete = Math.min(rounded, 100.0);
        progress(null, { trackingID: trackingID, value: percentComplete });
      } else {
        progress(new Error('Upload length is not computable'));
      }
    };

    xhr.open('POST', uri, true);
    fd.append('myFile', file);
    xhr.send(fd);
  },

  flattenJSON: (obj) => {
    let isPlainObj = (o) => {
      return Boolean(o && o.constructor && o.constructor.prototype && o.constructor.prototype.hasOwnProperty('isPrototypeOf'));
    };

    let flattenObj = (obj, keys = []) => {
      return Object.keys(obj).reduce((acc, key) => {
        return Object.assign(acc, isPlainObj(obj[key])
          ? flattenObj(obj[key], keys.concat(key))
          : {[keys.concat(key).join('.')]: obj[key]}
        );
      }, {});
    };
    return flattenObj(obj);
  },

  checkValueVsRegex: (id, regex) => {
    let elem = document.getElementById(id);
    if (regex.test(elem.value)) {
      elem.classList.remove('is-invalid');
      return true;
    } else {
      elem.classList.add('is-invalid');
      return false;
    }
  }
};

export default Utility;
