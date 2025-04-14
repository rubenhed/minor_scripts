/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/search', 'N/record', 'N/log'],

  (search, record, log) => {
    const onRequest = (scriptContext) => {
      const opportunitySearch = search.create({
        type: search.Type.OPPORTUNITY,
        columns: [
          'internalid',
          'custbody_ga_project_name'
        ]
      });

      opportunitySearch.run().each((result) => {
        const oppId = result.getValue('internalid');
        const custbodyName = result.getValue('custbody_ga_project_name');
        if (custbodyName) {
          return true;
        }

        const currentRecord = record.load({
          type: record.Type.OPPORTUNITY,
          id: oppId,
        });

        const projectName = currentRecord.getText('job');
        
        if (projectName) {
          log.audit(projectName, oppId);
          currentRecord.setValue('custbody_ga_project_name', projectName);
          currentRecord.save({
            ignoreMandatoryFields: true
          });
        }

        return true;
      })
    }

    return { onRequest }

  });
