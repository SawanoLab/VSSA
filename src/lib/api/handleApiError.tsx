import { AxiosError } from "axios";


const handleApiError = (errorMessage: string, error: AxiosError) => {
  if (error.response) {
    console.error(`${errorMessage} - レスポンスステータスコード: ${error.response.status}`);
    console.error("レスポンスデータ:", error.response.data);
  } else if (error.request) {
    console.error(`${errorMessage} - リクエストが行われましたが、レスポンスがありませんでした`);
  } else {
    console.error(`${errorMessage} - エラーメッセージ: ${error.message}`);
  }
};

export default handleApiError;
