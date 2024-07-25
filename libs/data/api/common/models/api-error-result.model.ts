export type ApiErrorResult = {
  name: string;
  message: string;
  errors: { [key: string]: string };
};
