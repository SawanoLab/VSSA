const handleFetchError = (error: any, dataType: string) => {
  console.error(`${dataType}の取得中にエラーが発生しました:`, error);
};

export default handleFetchError;
