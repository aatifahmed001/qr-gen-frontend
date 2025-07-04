// export const getEnvironmentVariable = (name) => import.meta.env[name]

export const getEnvironmentVariable = (key) => {
  const value = import.meta.env[key];
  if (!value) throw new Error(`${key} is not defined`);
  return value.endsWith('/') ? value.slice(0, -1) : value;
};