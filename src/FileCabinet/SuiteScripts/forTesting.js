/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/email', 'N/search', 'N/log', 'N/record'],
  (email, search, log, record) => {
    const onRequest = (scriptContext) => {
      const savedSearchId = 8784; //7241 for SB1
      const eventReminders = search.load({ id: savedSearchId }).run().getRange({ start: 0, end: 1000 });

      eventReminders.forEach(eventReminder => {
        const eventId = eventReminder.getValue({ name: 'internalid' })
        const eventRecord = record.load({
          type: record.Type.CALENDAR_EVENT,
          id: eventId
        });

        const organizerId = eventRecord.getValue('organizer');
        const startDate = eventRecord.getText('startdate');
        const nextTask = eventRecord.getText('custevent_ga_sales_nesttask');
        const nextTaskDetails = eventRecord.getValue('custevent_ga_nexttask_detail');
        
        email.send({
          author: organizerId,
          recipients: organizerId,
          subject: `タスクリマインダ - ${nextTask} - ${startDate}`,
          body: `
            <p><a href="https://6317455.app.netsuite.com/app/crm/calendar/event.nl?id=${eventId}" target="_blank">タスクを開く</a></p>
            <h3>次回タスク完了予定日</h3>
            <p>${startDate}</p>
            <h3>次のタスク</h3>
            <p>${nextTask}</p>
            <h3>次のタスク内容</h3>
            <p>${nextTaskDetails}</p>
          `
        });

        return true;
      });
    }

    return { onRequest }

  });
