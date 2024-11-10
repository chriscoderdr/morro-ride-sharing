const transformErrorResponse = (error) => {
  const data = (error.data as any)?.error;
  if (data) {
    return data;
  }
  return 'Oops! A network error occurred. Please check your internet connection and try again.';
};

export { transformErrorResponse };
