import '../dotenv.js';
import { db } from '../connect.js';
import { Configuration, OpenAIApi } from 'openai';
// import { stringify } from 'uuid';
// import * as Taglist from './taglist.js'; 


const configuration = new Configuration({
  apiKey: process.env.MY_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// console.log('openai:', openai);
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


const convertToPlainText = (taglist) => {
  let plainText = '';
  const array = taglist;
  for (let i = 0; i < array.length; i++) {
    plainText += `"${array[i]}"`;
    if (i === array.length - 2) {
      plainText += ' and ';
    } else if (i !== array.length - 1) {
      plainText += ',';
    }
  }
  return plainText;
};

/* TODO: convertToPlainText() 대신 JSON stringify ??? */

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

    // console.log('prompt: ', prompt);
    return prompt;
  } catch (err) {
    connection?.release();
    console.log(err);
    throw new Error('generate FAILED');
  }
};
