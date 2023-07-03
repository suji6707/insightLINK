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
export const generate = async (req, res, ocr, userId) => {
  console.log('generate--------------------------------------------'); 
  // console.log('generate: ', ocr); 

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: 'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
    
  } try {
    let prompt = await generatePrompt(ocr, userId);

    // console.log(typeof prompt, prompt);

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt}],
      temperature: 0,
      max_tokens: 400,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ['<EOL>'],
    });

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


const generatePrompt = async (ocrResult, userId) => {
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
    
    /* user_id=3 */
    let prompt = `Given ${taglist.length} categories: `; 
    prompt += `${taglistText}.`;
    prompt = `Please select between 2 to 5 categories that best describe the uploaded data. \n
              Prioritize selecting a category from the given categories, \n
              But if none of the categories are applicable, please select the between 2 to 5 categories that appear to be most relevant. \n
              `;
              
    prompt += 'Provide them in JSON format.\'{"tags":[]}\'\n';
    prompt += 'Uploaded data:';
    prompt += ocrResult;

    // console.log('prompt: ', prompt);
    return prompt;
  } catch (err) {
    connection?.release();
    console.log(err);
    throw new Error('generate FAILED');
  }
};


/* gpt-3.5-turbo 프롬프트 생성 */
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

  let prompt = "You are an assistant that helps users discover interesting topics based on their input. Your goal is to provide personalized category recommendations by considering the user's existing interests list and the provided data. Be creative and think outside the box to suggest new and exciting ideas. Engage in a friendly and thoughtful conversation, offering insights and suggestions beyond the predefined category list.\n";

  let note = "Note: The data provided by users is extracted from cell phone screenshots using OCR technology. Please be aware that it may contain miscellaneous elements such as cell phone carriers, battery levels, time stamps, and advertisements, which may not contribute to meaningful topics or categories.\n";

  let Behavior = "Please provide a minimum of 2 to 5 category recommendations that align with the user's interests and the provided data.\n";

  let responseType = `Please provide the categories in JSON format using the 'tags' property: '{"tags": []}'.`;
  responseType += `Example format: '{"tags": ["Category1", "Category2"]}'.`; 

  const systemContent = prompt + note + Behavior + responseType;
  console.log('System: ', systemContent);
  return systemContent;
};


const generateUserContent = async (ocrResult, userId) => {
  let connection = null;
  try {
    connection = await db.getConnection();
    const [rows] = await connection.query(`SELECT englishKeyword FROM taglist WHERE user_id = ${userId}`);
    connection.release();
    const taglist = rows.map(row => row.englishKeyword);   // taglist 테이블의 englishKeywords를 리스트로.
    const taglistText = taglist.map(tag => JSON.stringify(tag)).join(',');

    let prompt = `Please suggest relevant categories or topics based on the provided data.\n`;
    prompt += 'Data:';
    prompt += ocrResult;+`\n`;
    prompt += `While considering the user's general interests, which include ${taglistText}, `;
    prompt += `feel free to recommend new and exciting ideas that may go beyond the scope of the provided data.`;

    console.log('prompt: ', prompt);
    return prompt;
  } catch (err) {
    connection?.release();
    console.log(err);
    throw new Error('generateUserContent FAILED');
  }
};

