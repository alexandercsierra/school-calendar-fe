import axios from 'axios';

//converts a given time (in google-acceptable format) from military time to 12-hour time
export const convertTime = (time)=>{
    // code converts response.data.starttime to number
    if (time){

        let splitStartTime = time.split(':');
        let joinStartTime = splitStartTime.join('');
        let startTimeAsNumber = parseInt(joinStartTime, 10);
    
        // fn for converting response.data.starttime and/or endtime back to time string (from number)
        function convertToTime(value, index) {
          return value.substring(0, index) + ":" + value.substring(index);
        }
    
        // converts times from 24 hour to 12 hour format
        if (startTimeAsNumber >= 1300) {
          startTimeAsNumber -= 1200;
          let startTimeAsString = startTimeAsNumber.toString();
          let convertedStartTime = convertToTime(startTimeAsString, startTimeAsString.length - 2);
          return convertedStartTime + 'pm';
        } else {
          return time + 'am';
        }
    }
}

//adds an event template to the backend
export const addTemplate = async (data, { googleId }) => {
  const template = { ...data, googleId };
  try {
    const response = await axios.post(
      `https://d8pickerlabs22.herokuapp.com/api/template`,
      template
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};



//converts event to user's correct timezone
export const convertEvents = (selected, starttime, endtime, zone, summary, description) => {
  return selected.map(e => ({
    end: { dateTime: `${e}T${endtime}:00${zone}:00` },
    start: { dateTime: `${e}T${starttime}:00${zone}:00` },
    summary: summary,
    description: description
  }));
}

//deletes event template from the backend
export const deleteTemplate = async id => {
  try {
    const response = await axios.delete(
      `https://d8pickerlabs22.herokuapp.com/api/template/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error); 
  }
};

//deletes event templates from backend, updates templateList state to reflect this. It also clears whatever dates were currently selected and turns of date selection mode, although these are probably irrelevant on mobile due to component restructure.
export const handleDelete = async (id, deleteTemplate, templateList, setTemplateList, clearSelected, setTemplateFormOpen) => {
  await deleteTemplate(id);
  const templates = templateList.filter(template => template.id !== id);
  setTemplateList(templates);
  clearSelected();
  setTemplateFormOpen(false);
};

