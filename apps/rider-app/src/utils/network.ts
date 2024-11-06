const handleResponse = async (response: Response) => {
  try {
    const data = await response.json();
    return data;
  } catch (response) {
    const status = response?.status;

    let errorMessage = '';
    switch (response.statusText) {
      case 'FETCH_ERROR':
        errorMessage =
          'Oops! A network error occurred. Please check your internet connection and try again.';
        break;
      default:
        errorMessage =
          response?.data?.error ||
          'Something went wrong. Please try again later.';
        break;
    }
  }
};
