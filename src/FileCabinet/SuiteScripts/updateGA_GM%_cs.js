/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
define([],
  () => {
    const fieldChanged  = (scriptContext) => {
      const currentRecord = scriptContext.currentRecord;
      const fieldId = scriptContext.fieldId;
      
      if (fieldId === 'custbody_ga_uriage_mikomigaku' || fieldId === 'custbody_ga_gm_mikomigaku') {
        const uriage = currentRecord.getValue('custbody_ga_uriage_mikomigaku') || 0;
        const gm = currentRecord.getValue('custbody_ga_gm_mikomigaku') || 0;

        if (uriage === 0) {
          currentRecord.setValue('custbody_ga_gm_percentage', null);
        } else {
          currentRecord.setValue('custbody_ga_gm_percentage', `${((gm * 100) / uriage).toFixed(2)}%`);
        }
      }
    }

    return { fieldChanged  }
  });
