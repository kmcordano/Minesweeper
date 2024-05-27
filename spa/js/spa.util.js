/*
 * spa.util.js
 * General JavaScript utilities
 */

spa.util = (function() {
   let makeError;
   let setConfigMap;

   // Begin public constructor /makeError/
   // Purpose : a convenience wrapper to create an error object
   // Arguments 
   //    nameText : the error name
   //    msgText  : error message
   //    data     : optional data attached to error object
   // Returns : newly constructed error object
   // Throws  : none
   makeError = (nameText, msgText, data) => {
      let error = new Error();
      error.name = nameText;
      error.message = msgText;

      if(data) {
         error.data = data;
      }

      return error;
   };
   // End public constructor /makeError/

   // Begin public method /setConfigMap/
   // Purpose : common code to set configs in feature modules
   // Arguments
   //    inputMap    : map of key-values to set in config
   //    settableMap : map of allowable keys to set
   //    configMap   : map to apply settings to
   // Returns : true
   // Throws  : exception if input key not allowed
   setConfigMap = (argMap) => {
      let inputMap    = argMap.inputMap;
      let settableMap = argMap.settableMap;
      let configMap   = argMap.configMap;
      let keyName;
      let error;

      for(keyName in inputMap) {
         if(inputMap.hasOwnProperty(keyName)) {
            if(settableMap.hasOwnProperty(keyName)) {
               configMap[keyName] = inputMap[keyName];
            }
            else {
               error = makeError('Bad Input', `Setting config key '${keyName}' is not supported`);
               throw error;
            }
         }
      }
   };
   // End public method /setConfigMap/

   return {
      makeError    : makeError,
      setConfigMap : setConfigMap
   };
}());