import '../dotenv.js';
import { db } from '../connect.js';
import { Configuration, OpenAIApi } from 'openai';
// import { stringify } from 'uuid';
// import * as Taglist from './taglist.js'; 
/* log */
import { logger } from '../winston/logger.js';


const configuration = new Configuration({
  apiKey: process.env.MY_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// console.log('openai:', openai);
export const generateConversation = async (req, res, ocrResult, userId) => {
  console.log('generateConversation--------------------------------------------'); 
  // console.log('generate: ', ocr); 

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: 'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;

  } try {
    const systemContent = await generateSystemContent();
    const userContent = await generateUserContent(ocrResult, userId);

    // console.log(typeof prompt, prompt);

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: systemContent}, 
                { role: 'user', content: userContent}],
      temperature: 1,
      max_tokens: 250,
      top_p: 0.5,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    // console.log('generate 결과: ', completion.data.choices[0].message.content);
    return completion.data.choices[0].message.content;
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return error.response.status;
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return `${error.message}`;
    }
  }
};

const generateSystemContent = async () => {

  // let dataCharacter = "Characteristics of the data:\n";
  // dataCharacter += "1. What is the result of OCR extraction.\n";
  // dataCharacter += "2. Since it is cell phone screenshot data, meaningless data such as carrier, time, battery, etc. can be included together.\n";

  // let behaviorExpect = "Expected Behavior:\n";
  // behaviorExpect += "1. Considering the characteristics of the data and analyzing the data.\n";
  // behaviorExpect += "2. Presenting categories as analysis results.\n";
  // behaviorExpect += "3. The user can provide a list of categories in advance, but first check whether there is a category for the text data in the user's list.\n";
  // behaviorExpect += "4. Review the user-given list and suggest 2 to 5 categories, even if it is not necessarily a user-given list.\n"; 
  // behaviorExpect += "5. If you identify relationships or patterns between categories, suggest categories for them as well.\n";
  // behaviorExpect += "6. If there are no suitable categories based on the user's list or the identified relationships/patterns, suggest or consider suggesting 'Other' as a category.\n";
  let prompt = "Based on the text data extracted from pictures captured on a mobile screen, which may include OCR errors and potentially meaningless information like battery level or time, your task is to analyze the text data and suggest the most appropriate category for it. If you identify multiple categories that are suitable based on the given data, please prioritize suggesting categories that have a strong correlation or relationship with the data.\n";


  let responseType = `Please provide the categories in JSON format using the 'tags' property: '{"tags": []}'.\n`;
  responseType += `Example format: '{"tags": ["Category1", "Category2"]}'.`; 

  // const systemPrompt = dataCharacter + behaviorExpect + responseType;

  console.log('System: ', prompt + responseType);
  return prompt + responseType;
};

/* TODO: convertToPlainText() 대신 JSON stringify ??? */

const generateUserContent = async (ocrResult) => {
  let connection = null;
  try {
    connection = await db.getConnection();
    const [rows] = await connection.query(`SELECT englishKeyword FROM taglist WHERE user_id = ${userId}`);
    connection.release();
    const taglist = rows.map(row => row.englishKeyword);   // taglist 테이블의 englishKeywords를 리스트로.
    const taglistText = taglist.map(tag => JSON.stringify(tag)).join(',');



    // let prompt = `Given ${taglist.length} categories: `; 
    // prompt += `${taglistText}.`; 
    let exportTagCount = process.env.EXPORT_TAG_COUNT;  // 프롬프트에 2~5 제시
    /* user_id=1 */
    // let prompt = `Please brainstorm and select ${exportTagCount} new and unique categories that best describe the uploaded data. \n
    //               Do this even if you think some categories might already be covered in the existing list (${taglistText}). \n
    //               However, if the new categories exactly match any in the existing list, those from the list will be used. \n`;
    
    /* user_id 3버전 */
    // let prompt = `Please select ${exportTagCount} categories that best describe the uploaded data. \n
    //               If none of the categories are applicable, please select the ${exportTagCount} categories that appear to be most relevant.`;

    /* 제약사항 */
    // let prompt = `Based on the text data extracted from pictures captured on a mobile screen, \n
    //               which may include OCR errors and potentially meaningless information like battery level or time, \n
    //               please analyze the text data and suggest the most appropriate category for it. \n
    //               If you think multiple categories are suitable, you can suggest up to two to five categories. \n
    //               Additionally, if you observe any relationships or patterns among the suggested categories, \n
    //               please propose a new category that captures those insights. \n
    //               However, please prioritize selecting a category from the following list: ${taglistText}.`;
    prompt += 'Provide them in JSON format.\'{"tags":[]}\'\n';
    prompt += 'Uploaded data:';
    prompt += ocrResult;

    cnt += 1
    logger.info(`generatePrompt total cnt : ${cnt}`);
    console.log('prompt: ', prompt);
    return prompt;
  } catch (err) {
    connection?.release();
    console.log(err);
    throw new Error('generateUserContent FAILED');
  }
};

