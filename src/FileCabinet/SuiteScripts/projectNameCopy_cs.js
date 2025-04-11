/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
define([],
  () => {
    const fieldChanged  = (scriptContext) => {
      const currentRecord = scriptContext.currentRecord;
      const fieldId = scriptContext.fieldId;
      
      if (fieldId === 'job') {
        const projectName = currentRecord.getText('job');
        currentRecord.setValue('custbody_ga_project_name', projectName);
      }
    }

    return { fieldChanged  }
  });
