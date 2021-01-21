type UserKeys = 'user' | 'users';

type LocalAPIResponse<T> = {
  [key in UserKeys]: T;
} & {
  success: boolean;
};

export const getLocal = async <T = unknown>(
  path: string,
): Promise<LocalAPIResponse<T>> => {
  const result = await fetch(`/api/${path}`);
  return await result.json();
};
